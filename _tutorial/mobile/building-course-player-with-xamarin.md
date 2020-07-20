---
layout: tutorial
key: tutorial
title: "Building Course Player with Xamarin"
index: 8535
subcategory: mobile
date: 2017-07-24
tags: [Xamarin, C#]
---

> Build an iOS Course Player app with Xamarin and C#.

## 1. Creating Project
In Visual Studio, File->New Solution, select Multiplatform->App->Blank Native App(iOS, Android), Next.
![image](/assets/images/mobile/8535/project_create.png){:width="800px"}  
Provide the app name 'CoursePlayer' and specify the location for the source files, save the project. Three projects are created. One portable .NET project and two platform specific projects, one is for iOS and another for Android.
![image](/assets/images/mobile/8535/project_stucture.png){:width="320px"}  
Delete the Android Project, since I will only implement the iOS app. Rename the portable project to `Johnny.Portfolio.CoursePlayer.Core`. And rename the iOS project to `Johnny.Portfolio.CoursePlayer.iOS`.

## 2. Portable Project
### 2.1 Packages
Select the 'Johnny.Portfolio.CoursePlayer.Core' project, Project->Add NuGet Package, then NuGet Package Manager will be opened. Search `SharpZipLib.Portable`, select it and click 'Add Package'.
![image](/assets/images/mobile/8535/package_sharpziplibportable.png){:width="800px"}  
Install another package `Xamarin.Forms`.
![image](/assets/images/mobile/8535/package_xamarinforms.png){:width="800px"}  
The selected packages will be installed to current project. A new file named 'package.config' is added to the project.
```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
  <package id="SharpZipLib.Portable" version="0.86.0.0003" targetFramework="portable45-net45+win8+wp8+wpa81" />
  <package id="Xamarin.Forms" version="2.4.0.74863" targetFramework="portable45-net45+win8+wp8+wpa81" />
</packages>
```
Notice that, new packages are installed into the project's `Packages` folder. Now, we can include them into our project with `using` keyword.
### 2.2 Model Classes
Create file 'Models/Index.cs'.
```c#
using System;

namespace Johnny.Portfolio.CoursePlayer.Core.Models
{
    public class Index : IComparable<Index>
    {
        public Index(ushort timestamp, byte grid, int offset, uint length)
        {
            TimeStamp = timestamp;
            Grid = grid;
            Offset = offset;
            DataLength = length;
        }

        public ushort TimeStamp { get; } //in minute for whiteboard, in second for screenshot
        public byte Grid { get; }
        public int Offset { get; set; }
        public uint DataLength { get; set; }

        public byte Row
        {
            get { return (byte)(Grid >> 4); }
        }
        public byte Col
        {
            get { return (byte)(Grid & 0xf); }
        }

        public static int StreamSize
        {
            get { return 2 + 1 + 4 + 4; }
        }

        public int CompareTo(Index obj)
        {
            int compare = TimeStamp.CompareTo(obj.TimeStamp);
            if (compare == 0)
            {
                compare = Grid.CompareTo(obj.Grid);
            }
            return compare;
        }
    }
}
```
Create file 'Models/SSImage.cs'.
```c#
namespace Johnny.Portfolio.CoursePlayer.Core.Models
{
    public class SSImage
    {
        public SSImage(int row, int col, byte[] image)
        {
            Row = row;
            Col = col;
            Image = image;
        }

        public int Row { get; set; }
        public int Col { get; set; }
        public byte[] Image { get; set; }
    }
}
```
Create file 'Models/WBEvent.cs'.
```c#
namespace Johnny.Portfolio.CoursePlayer.Core.Models
{
    public class WBEvent
    {
        public WBEvent(uint timestamp, ushort reserved, int x, int y)
        {
            TimeStamp = timestamp;
            Reserved = reserved; // 0 by default
            X = x;
            Y = y;
        }

        public uint TimeStamp { get; set; } // From 0 to 60000, millseconds(0~59)
        public ushort Reserved { get; set; }
        public int X { get; set; } // It is special event based on its value
        public int Y { get; set; }

        public static int StreamSize
        {
            get { return 2 * 4; }
        }
    }
}
```
Create file 'Models/WBLine.cs'.
```c#
namespace Johnny.Portfolio.CoursePlayer.Core.Models
{
    public class WBLine
    {
        public WBLine(ushort x0, ushort y0, ushort x1, ushort y1, short color, ushort reserved)
        {
            X0 = x0;
            Y0 = y0;
            X1 = x1;
            Y1 = y1;
            Color = color;
            Reserved = reserved;
        }

        public ushort X0 { get; set; }
        public ushort Y0 { get; set; }
        public ushort X1 { get; set; }
        public ushort Y1 { get; set; }
        public short Color { get; set; }
        public ushort Reserved { get; set; }

        public static int StreamSize
        {
            get { return 2 * 6; }
        }
    }
}
```
Create file 'Models/WBData.cs'.
```c#
using System.Collections.Generic;

namespace Johnny.Portfolio.CoursePlayer.Core.Models
{
    public class WBData
    {
        public WBData(List<WBLine> lines, List<WBEvent> events)
        {
            WBLines = lines;
            WBEvents = events;
        }

        public List<WBLine> WBLines { get; set; }
        public List<WBEvent> WBEvents { get; set; }
    }
}
```
### 2.3 Core Classes
Create file `CompressHelper.cs`. This static class has some common compress and decompress methods. Later, we will use `Decompress(byte[] bytInput)` to decompress the index files of course.
```c#
using System;
using System.IO;
using System.Runtime.Serialization;
using System.Text;
using ICSharpCode.SharpZipLib.Zip.Compression;
using ICSharpCode.SharpZipLib.Zip.Compression.Streams;

namespace Johnny.Portfolio.CoursePlayer.Core
{
    public static class CompressHelper
    {
        public static byte[] Serialize(Object inst)
        {
            Type t = inst.GetType();
            var dcs = new DataContractSerializer(t);
            var ms = new MemoryStream();
            dcs.WriteObject(ms, inst);
            return ms.ToArray();
        }

        public static Object Deserialize(Type t, byte[] objectData)
        {
            var dcs = new DataContractSerializer(t);
            var ms = new MemoryStream(objectData);
            return dcs.ReadObject(ms);
        }

        public static byte[] SerializeAndCompress(Object inst)
        {
            byte[] b = Serialize(inst);
            byte[] b2 = Compress(b);
            return b2;
        }

        public static Object DecompressAndDeserialize(Type t, byte[] bytData)
        {
            byte[] b = Decompress(bytData);
            Object o = Deserialize(t, b);
            return o;
        }

        public static byte[] Compress(string strInput)
        {
            try
            {
                byte[] bytData = Encoding.UTF8.GetBytes(strInput);
                var ms = new MemoryStream();
                var defl = new Deflater(9, false);
                Stream s = new DeflaterOutputStream(ms, defl);
                s.Write(bytData, 0, bytData.Length);
                //s.Close();
                byte[] compressedData = ms.ToArray();
                return compressedData;
            }
            catch
            {
                throw;
            }
        }

        public static byte[] Compress(byte[] bytData)
        {
            try
            {
                var ms = new MemoryStream();
                var defl = new Deflater(9, false);
                Stream s = new DeflaterOutputStream(ms, defl);
                s.Write(bytData, 0, bytData.Length);
                //s.Close();
                byte[] compressedData = ms.ToArray();
                return compressedData;
            }
            catch
            {
                throw;
            }
        }

        public static byte[] Compress(byte[] bytData, params int[] ratio)
        {
            int compRatio = 9;
            if (ratio[0] > 0)
            {
                compRatio = ratio[0];
            }

            try
            {
                var ms = new MemoryStream();
                var defl = new Deflater(compRatio, false);
                Stream s = new DeflaterOutputStream(ms, defl);
                s.Write(bytData, 0, bytData.Length);
                //s.Close();
                byte[] compressedData = ms.ToArray();
                return compressedData;
            }
            catch
            {
                throw;
            }
        }

        public static byte[] Decompress(byte[] bytInput)
        {
            var ms = new MemoryStream(bytInput, 0, bytInput.Length);
            byte[] bytResult = null;
            string strResult = String.Empty;
            var writeData = new byte[6096];
            Stream steam = new InflaterInputStream(ms);
            try
            {
                bytResult = ReadFullStream(steam);
                return bytResult;
            }
            catch
            {
                throw;
            }
        }

        public static byte[] ReadFullStream(Stream stream)
        {
            var buffer = new byte[32768];
            using (var ms = new MemoryStream())
            {
                while (true)
                {
                    int read = stream.Read(buffer, 0, buffer.Length);
                    if (read <= 0)
                        return ms.ToArray();
                    ms.Write(buffer, 0, read);
                }
            }
        }
    }
}
```
Create an interface named `IFileHelper.cs`.
```c#
using System.Collections.Generic;

namespace Johnny.Portfolio.CoursePlayer.Core
{
    public interface IFileHelper
    {
        bool Exists(string filename);

        void WriteText(string filename, string text);

        string ReadText(string filename);

        IEnumerable<string> GetFiles();

        void Delete(string filename);

        byte[] ReadBytes(string filename);

        byte[] Seek(string filename, int offset, int length);

        void Close();
    }
}
```
The following points need to be noted about the above code.
* Interface `IFileHelper` defines several file operation methods.
* Use `ReadBytes()` to get entire content from the given file.
* Use `Seek()` to get partial content from the given file with specified offset and length.

Create file `FileHelper.cs`.
```c#
using System.Collections.Generic;
using System.IO;
using Xamarin.Forms;

namespace Johnny.Portfolio.CoursePlayer.Core
{
    class FileHelper : IFileHelper
    {
        readonly IFileHelper fileHelper = DependencyService.Get<IFileHelper>(DependencyFetchTarget.NewInstance);  //create new instance each time

        public bool Exists(string filename)
        {
            return fileHelper.Exists(filename);
        }

        public void WriteText(string filename, string text)
        {
            fileHelper.WriteText(filename, text);
        }

        public string ReadText(string filename)
        {
            return fileHelper.ReadText(filename);
        }

        public IEnumerable<string> GetFiles()
        {
            IEnumerable<string> filepaths = fileHelper.GetFiles();
            List<string> filenames = new List<string>();

            foreach (string filepath in filepaths)
            {
                filenames.Add(Path.GetFileName(filepath));
            }
            return filenames;
        }

        public void Delete(string filename)
        {
            fileHelper.Delete(filename);
        }

        public byte[] ReadBytes(string filename)
        {
            return fileHelper.ReadBytes(filename);
        }

        public byte[] Seek(string filename, int offset, int length)
        {
            return fileHelper.Seek(filename, offset, length);
        }

        public void Close()
        {
            fileHelper.Close();
        }
    }
}
```
The following points need to be noted about the above code.
* Class `FileHelper` implements interface `IFileHelper`.
* Use `DependencyService` to find the right platform implementation. Here it gets another IFileHelper implementation from iOS project.

Create file `FileApi.cs`. This static class defines the methods to read course data with FileHelper.
```c#
using System;
using System.Collections.Generic;
using System.IO;
using Johnny.Portfolio.CoursePlayer.Core.Models;

namespace Johnny.Portfolio.CoursePlayer.Core
{
    public static class FileApi
    {
        private static readonly FileHelper _fileHelper = new FileHelper();

        public static byte[] GetIndexFile(string originalFile) {
            byte[] bytes = _fileHelper.ReadBytes(originalFile);
            // decompress
            byte[] decompressedBytes = CompressHelper.Decompress(bytes);
            return decompressedBytes;
        }

        public static List<Index> GetIndexList(byte[] indexbuf)
        {
            List<Index> listIndex = new List<Index>();
            //read data to index list
            MemoryStream stream = new MemoryStream(indexbuf);
            BinaryReader breader = new BinaryReader(stream);
            for (int i = 0; i < indexbuf.Length / Index.StreamSize; i++)
            {
                Index item = new Index((ushort)breader.ReadInt16(), breader.ReadByte(), breader.ReadInt32(), (uint)breader.ReadInt32());
                listIndex.Add(item);
            }

            for (int i = 0; i < listIndex.Count; i++)
            {
                //dataffset ==-1 is the point to same block as previous one
                if (listIndex[i].Offset == -1 && i > 0)
                {
                    listIndex[i].Offset = listIndex[i - 1].Offset;
                    listIndex[i].DataLength = listIndex[i - 1].DataLength;
                }
            }

            listIndex.Sort();

            return listIndex;
        }

        // screenshot
        public static List<Index> GetSSIndex(List<Index> ssIndexList, IDictionary<int, int> mapIndex, int second)
        {
            bool[] foundset = new bool[Constants.MAX_ROW_NO * Constants.MAX_COL_NO];

            List<Index> res = new List<Index>();

            int firstItem = 0;
            int firstSecond = second;
            for (; firstSecond >= 0; firstSecond--)
            {
                if (mapIndex.ContainsKey(firstSecond))
                {
                    firstItem = mapIndex[firstSecond];
                    break;
                }
            }

            while (firstItem < ssIndexList.Count && ssIndexList[firstItem].TimeStamp == firstSecond)
            {
                firstItem++;
            }

            if (firstItem > 0)
            {
                for (int i = firstItem - 1; i >= 0; i--)
                {
                    int value = ssIndexList[i].Row * Constants.MAX_ROW_NO + ssIndexList[i].Col;
                    if (!foundset[value])
                    {
                        foundset[value] = true;
                        res.Add(ssIndexList[i]);
                    }
                    if (res.Count == Constants.MAX_ROW_NO * Constants.MAX_COL_NO)
                    {
                        break;
                    }
                }
            }
            return res;
        }

        public static List<SSImage> GetSSData(string imagedatafile, List<Index> ssIndex)
        {
            List<SSImage> imageList = new List<SSImage>();
            foreach (Index index in ssIndex)
            {
                byte[] buf = _fileHelper.Seek(imagedatafile, index.Offset, (int)index.DataLength);
                imageList.Add(new SSImage(index.Row, index.Col, buf));
            }

            return imageList;
        }

        // whiteboard
        public static IDictionary<int, int> GetWBIndex(List<Index> indexs)
        {
            if (indexs == null || indexs.Count == 0)
                return null;

            IDictionary<int, int> minute_index_map = new Dictionary<int, int>();

            for (int i = 0; i < indexs.Count; i++)
            {
                if (!minute_index_map.ContainsKey(indexs[i].TimeStamp))
                {
                    minute_index_map.Add(new KeyValuePair<int, int>(indexs[i].TimeStamp, i));
                }
            }

            return minute_index_map;
        }

        public static List<WBLine> GetWBImageData(string wbImageDataFile, List<Index> wbIndexList, IDictionary<int, int> wbImageIndex, int streamSize, TimeSpan tspan)
        {
            List<WBLine> wblines = new List<WBLine>();

            Index indeximage = null;
            if (wbImageIndex.ContainsKey((int)tspan.TotalMinutes))
                indeximage = wbIndexList[wbImageIndex[(int)tspan.TotalMinutes]];
            try
            {
                if (indeximage != null && indeximage.DataLength > 0)
                {
                    byte[] buf = _fileHelper.Seek(wbImageDataFile, indeximage.Offset, (int)indeximage.DataLength);
                    if (buf.Length == indeximage.DataLength)
                    {
                        //read data to index list
                        MemoryStream stream = new MemoryStream(buf);
                        BinaryReader breader = new BinaryReader(stream);
                        for (int i = 0; i < buf.Length / streamSize; i++)
                        {
                            wblines.Add(new WBLine((ushort)breader.ReadInt16(), (ushort)breader.ReadInt16(), (ushort)breader.ReadInt16(),
                                (ushort)breader.ReadInt16(), (short)breader.ReadInt16(), (ushort)breader.ReadInt16()));
                        }
                    }
                }
            }
            catch (Exception)
            {

            }

            return wblines;
        }

        public static List<WBEvent> GetWBSequenceData(string wbSequenceDataFile, List<Index> wbIndexList, IDictionary<int, int> wbSequenceIndex, int streamSize, TimeSpan tspan)
        {
            List<WBEvent> wbEvents = new List<WBEvent>();

            Index indeximage = null;
            if (wbSequenceIndex.ContainsKey((int)tspan.TotalMinutes))
                indeximage = wbIndexList[wbSequenceIndex[(int)tspan.TotalMinutes]];
            try
            {
                if (indeximage != null && indeximage.DataLength > 0)
                {
                    byte[] buf = _fileHelper.Seek(wbSequenceDataFile, indeximage.Offset, (int)indeximage.DataLength);
                    if (buf.Length == indeximage.DataLength)
                    {
                        //read data to index list
                        MemoryStream stream = new MemoryStream(buf);
                        BinaryReader breader = new BinaryReader(stream);
                        for (int i = 0; i < buf.Length / streamSize; i++)
                        {
                            wbEvents.Add(new WBEvent((uint)(breader.ReadUInt16()), (ushort)breader.ReadInt16(), (int)breader.ReadInt16(), (int)breader.ReadInt16()));
                        }
                    }
                }
            }
            catch (Exception)
            {

            }

            return wbEvents;
        }

        public static void Close()
        {
            if (_fileHelper != null)
                _fileHelper.Close();
        }
    }
}
```
The following points need to be noted about the above code.
* Use `FileHelper` to read data from local files.
* For Screenshot, decompress index file `ScreenShot/High/package.pak` to read all content and convert it to index list. Then, use offset and length of index to read image data by time(in second) from `ScreenShot/High/1.pak`.
* Whiteboard has two parts, one is the static lines `VectorImage`, another is dynamic drawing events `VectorSequence`. To get data for Whiteboard's lines, first, decompress index file `WB/1/VectorImage/package.pak` to read all content and convert it to index list. Then, use offset and length of index to read line data by time(in second) from `WB/1/VectorImage/1.pak`. The same operations to get Whiteboard's events.

Create file `CourseApi`.
```c#
using System;
using System.Collections.Generic;
using Johnny.Portfolio.CoursePlayer.Core.Models;

namespace Johnny.Portfolio.CoursePlayer.Core
{
    public static class CourseApi
    {
        const string ssIndexFile = "204304/ScreenShot/High/package.pak";
        const string ssDataFile = "204304/ScreenShot/High/1.pak";
        const string wbImageIndexFile = "204304/WB/1/VectorImage/package.pak";
        const string wbImageDataFile = "204304/WB/1/VectorImage/1.pak";
        const string wbSequenceIndexFile = "204304/WB/1/VectorSequence/package.pak";
        const string wbSequenceDataFile = "204304/WB/1/VectorSequence/1.pak";

        // Screenshot
        private static List<Index> ssIndexList = new List<Index>();
        private static IDictionary<int, int> ssIndexMap = new Dictionary<int, int>();
        // Whiteboard
        private static List<Index> wbImageIndexList;
        private static IDictionary<int, int> wbImageIndex;
        private static List<Index> wbSequenceIndexList;
        private static IDictionary<int, int> wbSequenceIndex;

        public static List<SSImage> GetScreenshotData(int second) {
            if (ssIndexList == null || ssIndexList.Count == 0)
            {
                var buffer = FileApi.GetIndexFile(ssIndexFile);
                ssIndexList = FileApi.GetIndexList(buffer);

                ssIndexMap.Clear();
                for (int i = 0; i < ssIndexList.Count; i++)
                {
                    if (!ssIndexMap.ContainsKey(ssIndexList[i].TimeStamp))
                    {
                        ssIndexMap.Add(new KeyValuePair<int, int>(ssIndexList[i].TimeStamp, i));
                    }
                }
            }

            var ssIndex = FileApi.GetSSIndex(ssIndexList, ssIndexMap, second);
            return FileApi.GetSSData(ssDataFile, ssIndex);
        }

        public static WBData GetWhiteboardData(int second)
        {
            // get lines
            List<WBLine> lines = GetWBImageData(second);
            // get events
            List<WBEvent> events = GetWBSequenceData(second);
            // combine them to whiteboard data
            WBData wb = new WBData(lines, events);
            return wb;
        }

        private static List<WBLine> GetWBImageData(int second)
        {
            try
            {
                if (wbImageIndex == null)
                {
                    var buffer = FileApi.GetIndexFile(wbImageIndexFile);
                    wbImageIndexList = FileApi.GetIndexList(buffer);
                    wbImageIndex = FileApi.GetWBIndex(wbImageIndexList);
                }

                TimeSpan tspan = TimeSpan.FromSeconds(second);
                List<WBLine> lines = FileApi.GetWBImageData(wbImageDataFile, wbImageIndexList, wbImageIndex, WBLine.StreamSize, tspan);
                return lines;
            }
            catch (Exception)
            {
                return null;
            }
        }

        private static List<WBEvent> GetWBSequenceData(int second)
        {
            try
            {
                if (wbSequenceIndex == null)
                {
                    var buffer = FileApi.GetIndexFile(wbSequenceIndexFile);
                    wbSequenceIndexList = FileApi.GetIndexList(buffer);
                    wbSequenceIndex = FileApi.GetWBIndex(wbSequenceIndexList);
                }

                TimeSpan tspan = TimeSpan.FromSeconds(second);
                List<WBEvent> events = FileApi.GetWBSequenceData(wbSequenceDataFile, wbSequenceIndexList, wbSequenceIndex, WBEvent.StreamSize, tspan);
                return events;

            }
            catch (Exception)
            {
                return null;
            }
        }

        public static void Close()
        {
             FileApi.Close();
        }
    }
}
```
The following points need to be noted about the above code.
* Define constants for data files.
* Use `GetScreenshotData` to the Screenshot data for the given second.
* Use `GetWhiteboardData` to the Whiteboard data for the given second.
* Use local variables to `cache` index files to improve performance.

### 2.4 Project Structure
The final structure of the portable project.
![image](/assets/images/mobile/8535/portable_project.png){:width="320px"}  

## 3. iOS Project
### 3.1 View Controllers
1) Right click the Johnny.Portfolio.CoursePlayer.iOS' project, Add->New File. Select iOS->View Controller, set name to 'CourseListViewController'.
![image](/assets/images/mobile/8535/ios_viewcontroller.png){:width="700px"}  
2) Create another two view controllers named 'PlayerViewController' and 'SettingsViewController'
3) We will not use the `xib` files, so just delete them.
### 3.2 UI Design with Xcode
Right click on 'Main.storyboard', Open With -> Xcode Interface Builder.
Create a Tab Bar controller, and bind three view controllers we created in Visual Studio.
![image](/assets/images/mobile/8535/ios_storyboard.png)  
The second tab will be used as our player. Save the storyboard before closing it, return to Visual Studio.
### 3.3 Model Classes
Create file `WBLineStyle.cs`. 'WBLineStyle' defines line color and width for drawing whiteboard. As we add reference to `UIKit` to use `UIColor`, it becomes platform specific(iOS), so we can't put this class to portable project.
```c#
using UIKit;

namespace Johnny.Portfolio.CoursePlayer.iOS.Models
{
    public class WBLineStyle
    {
        public WBLineStyle()
        {
            Color = UIColor.Black;
            Width = 1;
        }

        public UIColor Color { get; set; }
        public int Width { get; set; }

        public static WBLineStyle Create(int color)
        {
            WBLineStyle linestyle = new WBLineStyle();
            switch (color)
            {
                case -1:
                    linestyle.Color = UIColor.Red;
                    break;
                case -2:
                    linestyle.Color = UIColor.Blue;
                    break;
                case -3:
                    linestyle.Color = UIColor.Green;
                    break;
                case -8:
                    linestyle.Color = UIColor.Black;
                    break;
                case -9:
                    linestyle.Color = UIColor.White;
                    linestyle.Width = 8 * 10 / 12;
                    break;
                case -10:
                    linestyle.Color = UIColor.White;
                    linestyle.Width = 39 * 10 / 12;
                    break;
                default:
                    linestyle.Color = UIColor.White;
                    break;
            }

            return linestyle;
        }
    }
}
```
### 3.4 FileHelper
Create file `FileHelper.cs`.
```c#
using System;
using System.Collections.Generic;

using Xamarin.Forms;
using System.IO;
using Johnny.Portfolio.CoursePlayer.Core;

[assembly: Dependency(typeof(Johnny.Portfolio.CoursePlayer.iOS.FileHelper))]

namespace Johnny.Portfolio.CoursePlayer.iOS
{
    public class FileHelper : IFileHelper
    {
        IDictionary<string, FileStream> dictionary = new Dictionary<string, FileStream>();

        public bool Exists(string filename)
        {
            string filepath = GetFilePath(filename);
            return File.Exists(filepath);
        }

        public void WriteText(string filename, string text)
        {
            string filepath = GetFilePath(filename);
            File.WriteAllText(filepath, text);
        }

        public string ReadText(string filename)
        {
            string filepath = GetFilePath(filename);
            return File.ReadAllText(filepath);
        }

        public IEnumerable<string> GetFiles()
        {
            return Directory.GetFiles(GetDocsPath());
        }

        public void Delete(string filename)
        {
            File.Delete(GetFilePath(filename));
        }

        public byte[] ReadBytes(string filename)
        {
            try
            {
                FileStream indexstream = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.Read);
                BinaryReader breader = new BinaryReader(indexstream);

                return breader.ReadBytes((int)indexstream.Length);

            }
            catch (Exception)
            {
                return null;
            }
        }

        public byte[] Seek(string filename, int offset, int length)
        {
            try
            {
                byte[] buf = new byte[length];
                FileStream fs = null;
                if (dictionary.ContainsKey(filename))
                {
                    fs = dictionary[filename];
                }
                else
                {
                    //make sure DependencyFetchTarget.NewInstance is set
                    fs = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.Read);
                    dictionary.Add(filename, fs);
                }
                fs.Seek(offset, SeekOrigin.Begin);
                fs.Read(buf, 0, length);
                return buf;
            }
            catch (Exception)
            {
                return null;
            }            
        }

        public void Close()
        {
            foreach (KeyValuePair<string, FileStream> entry in dictionary)
            {
                if (entry.Value != null)
                {
                    entry.Value.Close();
                }
            }
            dictionary.Clear();
        }

        private string GetFilePath(string filename)
        {
            return Path.Combine(GetDocsPath(), filename);
        }

        private string GetDocsPath()
        {
            return Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        }
    }
}
```
The following points need to be noted about the above code.
* Class `FileHelper` implements interface `IFileHelper`.
* Use `Dependency` attribute to register `FileHelper` to DependencyService.
* Use `ReadBytes()` to get entire content from the given file.
* Use `Seek()` to get partial content from the given file with specified offset and length.
* Use Dictionary to cache the file streams to avoid frequent IO operations.

### 3.5 Canvas Views
Create file `ScreenShotCanvasView.cs`.
```c#
using System;
using System.Collections.Generic;

using Foundation;
using UIKit;
using CoreGraphics;
using Johnny.Portfolio.CoursePlayer.Core.Models;

namespace Johnny.Portfolio.CoursePlayer.iOS
{
    public class ScreenShotCanvasView : UIView
    {
        private bool needclear = false;

        public ScreenShotCanvasView()
        {
            BackgroundColor = UIColor.Clear;
        }

        public ScreenShotCanvasView(CGRect cgrect)
        {
            base.Frame = cgrect;
            BackgroundColor = UIColor.Clear;
        }

        public override void Draw (CGRect rect)
        {
            base.Draw (rect);

            var gctx = UIGraphics.GetCurrentContext();

            if (needclear)
            {
                gctx.ClearRect(rect);
                gctx.SetStrokeColor(UIColor.Blue.CGColor);
                gctx.SetLineWidth(2);
                gctx.StrokeRect(rect);
                needclear = false;
                return;
            }

            gctx.SetStrokeColor(UIColor.Blue.CGColor);
            gctx.SetLineWidth(2);
            gctx.StrokeRect(rect);

            if (SSData != null && SSData.Count > 0)
            {
                foreach (SSImage item in SSData)
                {
                    UIImage uiImage = ToImage(item.Image);
                    uiImage.Draw(GetRect(rect.Size.Width, rect.Size.Height, item.Row, item.Col));
                }
            }
        }

        public static UIImage ToImage(byte[] data)
        {
            if (data == null)
            {
                return null;
            }
            UIImage image = null;
            try
            {
                image = new UIImage(NSData.FromArray(data));
                data = null;
            }
            catch (Exception)
            {
                return null;
            }
            return image;
        }

        private CGRect GetRect(nfloat containerwidth, nfloat containerheight, int row, int col)
        {
            if (row < 0 || col < 0 || row > 7 || col > 7)
                return new CGRect();

            double left = containerwidth / 8 * col;
            double top = containerheight / 8 * row;
            double width = containerwidth / 8;
            double height = containerheight / 8;

            return new CGRect(left, top, width, height);

        }

        public List<SSImage> SSData { get; set; }

        public void Clear()
        {
            needclear = true;
        }
    }
}
```
The following points need to be noted about the above code.
* Class `ScreenShotCanvasView` inherits `UIView`. It is the canvas which will be used for drawing screenshot.
* Create another constructor `ScreenShotCanvasView(CGRect cgrect)` to accept location and size.
* Use property `SSData` to receive screenshot data. SSData should contains 64 small images.
* Override method `Draw(CGRect rect)` to draw images for screenshot.

Create file `WhiteBoardCanvasView.cs`.
```c#
using System;
using System.Collections.Generic;
using System.Collections;

using UIKit;
using CoreGraphics;
using Johnny.Portfolio.CoursePlayer.Core.Models;
using Johnny.Portfolio.CoursePlayer.iOS.Models;

namespace Johnny.Portfolio.CoursePlayer.iOS
{
    public class WhiteBoardCanvasView : UIView
    {
        private WBEvent lastPoint;
        private WBLineStyle currentLineStyle;
        private int currentEventTs = -1;
        private int previousMin;
        private bool needclear = false;

        public WhiteBoardCanvasView()
        {
            BackgroundColor = UIColor.Clear;
            //Opaque = false;
            currentLineStyle = new WBLineStyle();
        }

        public WhiteBoardCanvasView(CGRect cgrect)
        {
            base.Frame = cgrect;
            BackgroundColor = UIColor.Clear;
            //Opaque = false;
            currentLineStyle = new WBLineStyle();
        }

        public override void Draw (CGRect rect)
        {
            base.Draw (rect);

            var gctx = UIGraphics.GetCurrentContext ();

            if (needclear)
            {
                gctx.ClearRect(rect);
                gctx.SetStrokeColor(UIColor.Green.CGColor);
                gctx.SetLineWidth(2);
                gctx.StrokeRect(rect);
                needclear = false;
                return;
            }

            gctx.SetStrokeColor(UIColor.Green.CGColor);
            gctx.SetLineWidth(2);
            gctx.StrokeRect(rect);            

            if (WhiteBoardData != null)
            {
                var xRate = rect.Size.Width / 9600;
                var yRate = rect.Size.Height / 4800;

                UIColor.Clear.SetFill();
                UIColor.Black.SetStroke();

                int currentMin = GetMinute(CurrentSecond);
                if (previousMin != currentMin)
                {
                    previousMin = currentMin;
                    currentEventTs = -1;
                }

                if (WhiteBoardData.WBLines != null && WhiteBoardData.WBLines.Count > 0)
                {
                    foreach (WBLine line in WhiteBoardData.WBLines)
                    {
                        WBLineStyle linestyle = WBLineStyle.Create(line.Color);
                        linestyle.Color.SetStroke();
                        gctx.SetLineWidth(linestyle.Width);
                        gctx.MoveTo(line.X0 * xRate, line.Y0 * yRate);
                        gctx.AddLineToPoint(line.X1 * xRate, line.Y1 * yRate);
                        gctx.StrokePath();
                    }
                }

                if (WhiteBoardData.WBEvents != null && WhiteBoardData.WBEvents.Count > 0)
                {
                    Hashtable group = GroupWBEventsBySecond(WhiteBoardData.WBEvents);

                    int endMilliseconds = CurrentSecond * 1000 % 60000;
                    int ix;
                    for (ix = currentEventTs; ix <= endMilliseconds; ix++)
                    {
                        List<WBEvent> wbevents = group[(uint)ix] as List<WBEvent>;

                        if (wbevents == null)
                            continue;

                        foreach (WBEvent wbevent in wbevents)
                        {
                            if (wbevent.X >= 0)
                            {
                                if (lastPoint == null)
                                    lastPoint = wbevent;
                                else
                                {
                                    currentLineStyle.Color.SetStroke();
                                    gctx.SetLineWidth(currentLineStyle.Width);

                                    gctx.MoveTo(lastPoint.X * xRate, lastPoint.Y * yRate);
                                    gctx.AddLineToPoint(wbevent.X * xRate, wbevent.Y * yRate);
                                    gctx.StrokePath();
                                    lastPoint = wbevent;
                                }
                            }
                            else
                            {
                                switch (wbevent.X)
                                {
                                    case -100: //Pen Up
                                        currentLineStyle.Color = UIColor.Black;
                                        lastPoint = null;
                                        break;
                                    case -200: //Clear event
                                        gctx.ClearRect(rect);
                                        lastPoint = null;
                                        break;
                                    default:
                                        currentLineStyle = WBLineStyle.Create(wbevent.X);
                                        break;
                                }
                                lastPoint = null;
                            }
                        }
                    }
                }
            }
        }

        public void Clear()
        {
            needclear = true;
        }

        private Hashtable GroupWBEventsBySecond(List<WBEvent> lstEvents)
        {
            Hashtable ht = new Hashtable();
            foreach (WBEvent item in lstEvents)
            {
                if (!ht.Contains(item.TimeStamp))
                {
                    List<WBEvent> newlist = new List<WBEvent>();
                    newlist.Add(item);
                    ht.Add(item.TimeStamp, newlist);
                }
                else
                {
                    List<WBEvent> existlist = ht[item.TimeStamp] as List<WBEvent>;
                    existlist.Add(item);
                }
            }

            return ht;
        }

        private int GetMinute(int ts)
        {
            if (ts <= 0)
                return -1;

            TimeSpan tspan = TimeSpan.FromSeconds(ts);
            return (int)tspan.TotalMinutes;
        }

        public WBData WhiteBoardData { get; set; }
        public int CurrentSecond { get; set; }
    }
}
```
The following points need to be noted about the above code.
* Class `WhiteBoardCanvasView` inherits `UIView`. It is the canvas which will be used for drawing whiteboard.
* Create another constructor `WhiteBoardCanvasView(CGRect cgrect)` to accept location and size.
* Use property `WBData` to receive whiteboard data. SSData should both lines and events.
* Override method `Draw(CGRect rect)` to draw lines for whiteboard.

### 3.6 Player View Controller
```c#
using System;
using System.Collections.Generic;

using UIKit;
using CoreGraphics;
using System.Timers;
using Xamarin;
using Johnny.Portfolio.CoursePlayer.Core;
using Johnny.Portfolio.CoursePlayer.Core.Models;

namespace Johnny.Portfolio.CoursePlayer.iOS
{
    public partial class PlayerViewController : UIViewController
    {
        UIButton btnPlay;
        UISlider sliderTimeline;
        UILabel lblCurrentTime;

        WhiteBoardCanvasView canvasWB;
        ScreenShotCanvasView canvasSS;

        private PlayerState playStatus = PlayerState.Stopped;

        Timer timerVideo = new Timer();
        Timer timerSS = new Timer();
        Timer timerWB = new Timer();

        public PlayerViewController(IntPtr handle)
            : base(handle)
        {
            Xamarin.Forms.Forms.Init();
        }

        public override void DidReceiveMemoryWarning()
        {
            // Releases the view if it doesn't have a superview.
            base.DidReceiveMemoryWarning();

            // Release any cached data, images, etc that aren't in use.
        }

        #region View lifecycle

        public override void ViewDidLoad()
        {
            base.ViewDidLoad();

            try
            {
                // Perform any additional setup after loading the view, typically from a nib.
                View.BackgroundColor = UIColor.White;

                // play button
                btnPlay = UIButton.FromType(UIButtonType.RoundedRect);
                btnPlay.SetTitle("Play", UIControlState.Normal);
                btnPlay.Frame = new CGRect(0, 20, 320, 30);
                btnPlay.TouchUpInside += BtnPlay_TouchUpInside;
                View.AddSubview(btnPlay);

                // slider bar
                sliderTimeline = new UISlider(new CGRect(0, 40, 320, 34));
                View.Add(sliderTimeline);

                int timeframe = 4*60*60-30*60;
                sliderTimeline.MinValue = 0f;
                sliderTimeline.MaxValue = Convert.ToSingle(timeframe);
                sliderTimeline.Value = 0f;
                sliderTimeline.ValueChanged += SliderTimeline_ValueChanged;
                sliderTimeline.TouchUpInside += SliderTimeline_TouchUpInside;
                sliderTimeline.TouchDown += SliderTimeline_TouchDown;

                // time label
                lblCurrentTime = new UILabel(new CGRect(0, 74, 320, 20))
                {
                    Text = "00:00:00",
                    TextAlignment = UITextAlignment.Center
                };
                View.Add(lblCurrentTime);

                // canvas for screenshot
                canvasSS = new ScreenShotCanvasView(new CGRect(0, 104, 320, 200));
                View.Add(canvasSS);

                // canvas for whiteboard
                canvasWB = new WhiteBoardCanvasView(new CGRect(0, 310, 320, 200));
                View.Add(canvasWB);
            }
            catch (Exception ex)
            {
                Insights.Report(ex);
            }
        }

        void SliderTimeline_ValueChanged(object sender, EventArgs e)
        {
            lblCurrentTime.Text = GetReadableTimeText(sliderTimeline.Value);
        }

        void SliderTimeline_TouchDown(object sender, EventArgs e)
        {
            if (playStatus == PlayerState.Playing)
            {
                // disable all events when touching down
                timerVideo.Elapsed -= TimerVideo_Elapsed;
                timerVideo.Enabled = false;
                timerSS.Elapsed -= TimerSS_Elapsed;
                timerSS.Enabled = false;
                timerWB.Elapsed -= TimerWB_Elapsed;
                timerWB.Enabled = false;
            }
        }

        void SliderTimeline_TouchUpInside(object sender, EventArgs e)
        {
            if (playStatus == PlayerState.Playing)
            {
                StartPlayer();
            }
        }

        void BtnPlay_TouchUpInside(object sender, EventArgs e)
        {
            if (playStatus == PlayerState.Stopped)
            {
                StartPlayer();
            }
            else if (playStatus == PlayerState.Playing)
            {
                StopPlayer();
            }
        }

        void TimerVideo_Elapsed(object sender, ElapsedEventArgs e)
        {
            InvokeOnMainThread(delegate
            {
                if (sliderTimeline.Value >= sliderTimeline.MaxValue)
                {
                    StopPlayer();
                }
                else
                {
                    sliderTimeline.Value++;
                    lblCurrentTime.Text = GetReadableTimeText(sliderTimeline.Value);
                }
            });
        }

        void TimerSS_Elapsed(object sender, ElapsedEventArgs e)
        {
            InvokeOnMainThread(delegate
            {
                int second = Convert.ToInt32(sliderTimeline.Value);
                List<SSImage> ssData = CourseApi.GetScreenshotData(second);
                canvasSS.SSData = ssData;
                canvasSS.SetNeedsDisplay();
            });
        }

        void TimerWB_Elapsed(object sender, ElapsedEventArgs e)
        {
            InvokeOnMainThread(delegate
            {
                int second = Convert.ToInt32(sliderTimeline.Value);
                WBData wbData = CourseApi.GetWhiteboardData(second);
                canvasWB.WBData = wbData;
                canvasWB.CurrentSecond = second;
                canvasWB.SetNeedsDisplay();
            });
        }

        private void StartPlayer() {
            btnPlay.SetTitle("Stop", UIControlState.Normal);
            btnPlay.SetTitleColor(UIColor.Red, UIControlState.Normal);

            // enable all events
            timerVideo.Elapsed += TimerVideo_Elapsed;
            timerVideo.Interval = 1000; // Timer will tick every 1 seconds
            timerVideo.Enabled = true;  // Enable the timer
            timerVideo.Start();

            timerSS.Elapsed += TimerSS_Elapsed;
            timerSS.Interval = 1000; // Timer will tick every 1 seconds
            timerSS.Enabled = true;  // Enable the timer
            timerSS.Start();

            timerWB.Elapsed += TimerWB_Elapsed;
            timerWB.Interval = 1000; // Timer will tick every 2 seconds
            timerWB.Enabled = true;  // Enable the timer
            timerWB.Start();

            playStatus = PlayerState.Playing;
        }

        private void StopPlayer() {
            btnPlay.SetTitle("Play", UIControlState.Normal);
            btnPlay.SetTitleColor(UIColor.Blue, UIControlState.Normal);
            timerVideo.Elapsed -= TimerVideo_Elapsed;
            timerSS.Elapsed -= TimerSS_Elapsed;
            timerWB.Elapsed -= TimerWB_Elapsed;
            timerVideo.Enabled = false;
            timerSS.Enabled = false;
            timerWB.Enabled = false;
            sliderTimeline.Value = 0f;
            lblCurrentTime.Text = "00:00:00";
            canvasWB.Clear();
            canvasWB.SetNeedsDisplay();
            canvasSS.Clear();
            canvasSS.SetNeedsDisplay();
            CourseApi.Close(); // close file
            playStatus = PlayerState.Stopped;
        }

        private string GetReadableTimeText(float input)
        {
            int totalseconds = Convert.ToInt32(input);
            int hours, minutes, seconds = 0;
            seconds = totalseconds % 60;
            hours = totalseconds / (60 * 60);
            minutes = (totalseconds - hours * 60 * 60) / 60;

            string outh, outm, outs = "";
            outh = hours < 10 ? "0" + hours.ToString() : hours.ToString();
            outm = minutes < 10 ? "0" + minutes.ToString() : minutes.ToString();
            outs = seconds < 10 ? "0" + seconds.ToString() : seconds.ToString();


            return string.Format("{0}:{1}:{2}", outh, outm, outs);
        }

        public override void ViewWillAppear(bool animated)
        {
            base.ViewWillAppear(animated);
        }

        public override void ViewDidAppear(bool animated)
        {
            base.ViewDidAppear(animated);
        }

        public override void ViewWillDisappear(bool animated)
        {
            base.ViewWillDisappear(animated);
        }

        public override void ViewDidDisappear(bool animated)
        {
            base.ViewDidDisappear(animated);
        }

        #endregion
    }
}
```
The following points need to be noted about the above code.
* In `ViewDidLoad()`, we dynamically create button, slider bar and two canvas controls.
* The max value of slider bar is 4 * 60 * 60 - 30 * 60 = 12600 seconds, since each course lasts 3 and half hours.
* Use `ScreenShotCanvasView` and `WhiteBoardCanvasView` as customized canvas controls.
* When `Play` button is clicked, three timers begin to work. The first timer increment the value of slider bar. The second timer gets data for screenshot and notifies screenshot canvas to draw it. The third timer gets data for whiteboard and notifies whiteboard canvas to draw it.
* Why use three timers? Actually, we just need only one timer, the slider timer. We could put the codes for drawing screenshot and whiteboard to the slider timer. However, by using three timer, the drawing task for screenshot and whiteboard can be divided and performance would be better.

Open the storyboard in Xamarin, you will see the layout of `PlayerViewController`.
![image](/assets/images/mobile/8535/ios_storyboardxamarin.png)

### 3.7 Project Structure
The final structure of the iOS project.
![image](/assets/images/mobile/8535/ios_project.png){:width="320px"}  
Notice, folder `204304` contains the data files for screenshot and whiteboard.

### 3.8 Architecture
Class diagram shows the design of this app based on Xamarin framework.
![framework](/assets/images/mobile/8535/framework.png)  

## 4. Testing
In Visual Studio, click the arrow button(or Run->Start Without Debugging) to run the app in iOS Simulator.  
On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The upper one is for screenshot and the lower one is for whiteboard.
![image](/assets/images/mobile/8535/homepage.png){:width="400px"}  
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/images/mobile/8535/play.png){:width="400px"}  
You can drag the slider bar to move forward or backward.
![image](/assets/images/mobile/8535/drag.png){:width="400px"}  

## 5. Source Files
* [Source files of Course Player(Xamarin) on Github](https://github.com/jojozhuang/course-player-xamarin)

## 6. References
* [Xamarin Forms Samples](https://github.com/xamarin/xamarin-forms-samples)
* [Xamarin Recipes](https://github.com/xamarin/recipes)
* [Introduction to Storyboards](https://developer.xamarin.com/guides/ios/user_interface/storyboards/)
* [Introduction to DependencyService](https://developer.xamarin.com/guides/xamarin-forms/application-fundamentals/dependency-service/introduction/)
