---
layout: tutorial
key: tutorial
title: "Building RESTful API with ASP.NET Core"
index: 8612
subcategory: restful-api
date: 2017-12-11
tags: [ASP.NET Core, RESTful, WebAPI 2.0]
---

> Create Restful Web Service with ASP.NET Core for Angular/ReactJS App to consume.

## 1. RESTful APIs
In this tutorial, we will create the following RESTful APIs for our Game Store web application.

API                       | Description         | Request body | Response body
--------------------------|---------------------|--------------|-------------------
GET /api/products         | Get all products    | None         | Array of Products
GET /api/products/{id}    | Get a product by ID | None         | Product
POST /api/products        | Add a new product   | Product      | Product
PUT /api/products/{id}    | Update a product    | Product      | None
DELETE /api/products/{id} | Delete a product    | None         | None
POST /api/upload          | Upload an image     | Image File   | Image URL

## 2. Web API Project
### 2.1 Creating Project
In Visual Studio, File->New Solution, select .NET Core->App->ASP.NET Core Web API, Next.
![image](/assets/images/backend/8612/project_create.png){:width="800px"}  
Specify the Project Name, Solution Name and Location, Create.
![image](/assets/images/backend/8612/project_location.png){:width="800px"}  
One solution and one project are created. This Web API project is based on ASP.NET Core. There is one default controller 'ValuesController' in the new project.
![image](/assets/images/backend/8612/project_stucture.png){:width="320px"}  

### 2.2 Installing Packages
Since we will use SQLite as database and EntityFramework as data access engine, we first need to install the relevant packages.
Select the ‘Johnny.Tutorials.RestfulAspNet’ project, Project->Add NuGet Package to open the NuGet Package Manager. Then, search and install package `sqlite-net-pcl` and `Microsoft.EntityFrameworkCore.Sqlite`.

### 2.3 Model Class
Create a folder named `Models` under the project, and create a file named 'Product.cs'. Define a class named 'Product' with four properties: id, name, price and a photo of the product.
```c#
using SQLite;

namespace Johnny.Tutorials.RestfulAspNet.Models
{
    public class Product
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
    }
}
```

### 2.4 DbContext for EntityFramework
Create a folder named `Data` under the project, and create a file named 'SqliteContext.cs'. Class `SqliteContext` inherits `DbContext` with DbSet Products. Notice, we manually create table `products` if it's not existing.
```c#
using System;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.EntityFrameworkCore;

namespace Johnny.Tutorials.RestfulAspNet.Data
{
    public class SqliteContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public SqliteContext(DbContextOptions<SqliteContext> options)
            : base(options)
        {
            // create table
            String createTable = "CREATE TABLE IF NOT EXISTS 'products' ('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'productname' TEXT NOT NULL, 'price' REAL, 'image' TEXT);";
            this.Database.ExecuteSqlCommand(createTable);
            this.SaveChanges();
        }
    }
}
```

In Startup.cs, register this SqliteContext with options of the database name to the services.
```c#
public void ConfigureServices(IServiceCollection services)
{
    ...

    services.AddDbContext<SqliteContext>(opt => opt.UseSqlite("Data Source=SQLiteProduct.db"));
    services.AddMvc();

    ...
}
```
When this web api service is started, a SQLite database file named `SQLiteProduct.db` will be created in the root folder of the project.
![image](/assets/images/backend/8612/sqlitedb_file.png){:width="400px"}  

### 2.5 Controller
In 'Controller' folder, delete the auto-generated 'ValuesController.cs'. Then, create a new controller named 'ProductsController'.
![image](/assets/images/backend/8612/newfile_controller.png){:width="700px"}  
Edit its content as follows.
```c#
using System;
using System.Linq;
using System.Threading.Tasks;
using Johnny.Tutorials.RestfulAspNet.Data;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Johnny.Tutorials.RestfulAspNet.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly SqliteContext _context;
        private readonly HttpContext _currentContext;

        public ProductsController(SqliteContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _currentContext = httpContextAccessor.HttpContext;

            if (_context.Products.Count() == 0)
            {
                _context.Products.Add(new Product { ProductName = "Xbox 360", Price = 299.00, Image = UploadController.GetImageUrl(_currentContext, "xbox360.jpg") });
                _context.Products.Add(new Product { ProductName = "Wii", Price = 269.00, Image = UploadController.GetImageUrl(_currentContext, "wii.jpg") });
                _context.Products.Add(new Product { ProductName = "Wireless Controller", Price = 19.99, Image = UploadController.GetImageUrl(_currentContext, "controller.jpg") });
                _context.SaveChanges();
            }
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _context.Products.ToListAsync();
            products.Reverse();
            return Ok(products);
        }

        // GET api/products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST api/products
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Product product)
        {
            if (product == null || product.Id != 0 || String.IsNullOrEmpty(product.ProductName)) {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            await _context.Products.AddAsync(product);
            _context.SaveChanges();

            return Ok();
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]Product product)
        {
            if (product == null || product.Id == 0 || String.IsNullOrEmpty(product.ProductName))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            var oldProduct = _context.Products.SingleOrDefault(p => p.Id == product.Id);
            if (oldProduct == null) {
                return NotFound();
            }
            _context.Entry(oldProduct).CurrentValues.SetValues(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
```
Some important points here.
* Define 5 CRUD methods(GetAll, GetOne, Create, Update and Delete).
* To force Web API to read a simple type from the request body, add the [FromBody] attribute to the parameter.
* Use IActionResult as return type. Return Ok() and proper data if everything is fine, otherwise, return status code of error.
* Use the injected DbContext to utilize EntityFramework to get data from SQLite database.
* Use async/await to improve performance.
* Create dummy data(3 products) if there is no product in table.

If you have additional API, you can create customized action. Add Route attribute with the action name to the method. The following API 'api/products/top' returns top 3 products.
```c#
[Route("api/[controller]")]
public class ProductsController : Controller
{
    ...

    // GET api/products/top
    [Route("top")]
    public async Task<IActionResult> Top()
    {
        var products = await _context.Products.ToListAsync();
        var topProducts = products.Take(3);
        return Ok(topProducts);
    }
}
```

## 3. Uploading Images
When creating or updating product, user can upload an image for the product.
### 3.1 Model Class
Create a file named 'ResponseResult.cs' under folder 'Models'. Class 'ResponseResult' has two properties, status code and message.
```c#
namespace Johnny.Tutorials.RestfulAspNet.Models
{
    public class ResponseResult
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}
```
### 3.2 Controller
Create a new controller named 'UploadController' under 'Controller' folder with the following content.
```c#
using System;
using System.IO;
using System.Threading.Tasks;
using Johnny.Tutorials.RestfulAspNet.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Johnny.Tutorials.RestfulAspNet.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly HttpContext _currentContext;

        public UploadController(IHostingEnvironment hostingEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
            _currentContext = httpContextAccessor.HttpContext;
        }

        // POST api/upload
        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            ResponseResult rr = new ResponseResult();
            if (file == null || file.Length == 0)
            {
                rr.StatusCode = StatusCodes.Status400BadRequest;
                rr.Message = "no file is uploaded";
                return Ok(rr);
            }

            var filename = $@"{DateTime.Now.Ticks}_" + file.FileName;

            var path = Path.Combine(_hostingEnvironment.WebRootPath, "images", filename);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            rr.StatusCode = StatusCodes.Status200OK;
            rr.Message = GetImageUrl(_currentContext, filename);
            return Ok(rr);
        }

        public static string GetImageUrl(HttpContext context, string imageName)
        {
            return Path.Combine(GetBaseUrl(context), "images", imageName);
        }

        public static string GetBaseUrl(HttpContext context)
        {
            var request = context.Request;
            var host = request.Host.ToUriComponent();
            var pathBase = request.PathBase.ToUriComponent();
            return $"{request.Scheme}://{host}{pathBase}";
        }
    }
}
```

Some important points here.
* Use IHostingEnvironment.WebRootPath to get the root folder.
* Rename the uploaded image with DateTime Ticks to make sure it is identical.
* Combine the root folder and image name to get the full path of the image and save it to disk.
* Return the image URL for the client to access it. Will explain how to get the base URL later.

## 4. Advanced Configuration
### 4.1 Enabling CORS
In Startup.cs, configure a CORS policy in the ConfigureServices method.
```c#
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    }));

    services.AddMvc();
    // ...
}
```
Then, in Configure method, apply this policy globally.
```c#
public void Configure(IApplicationBuilder app)
{
    // ...

    app.UseCors("CorsPolicy");
    app.UseMvc();
}
```
Or, you can enable CORS at controller level by adding 'EnableCors' attribute to specific controller.
```c#
[EnableCors("CorsPolicy")]
[Route("api/[controller]")]
public class ProductsController : Controller
{
    // ...
}
```
### 4.2 Serving Static Files
1) Install package `Microsoft.AspNetCore.StaticFiles`.  
2) Copy images into 'wwwroot' folder of the project.  
![image](/assets/images/backend/8612/images_wwwroot.png){:width="700px"}  
3) In Program.cs, call UseContentRoot() with the current directory in BuildWebHost method.
```c#
public static IWebHost BuildWebHost(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
           .UseContentRoot(Directory.GetCurrentDirectory())
           .UseStartup<Startup>()
           .Build();
```
4) In Startup.cs, configure the static files middleware as follows.
```c#
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    ...

    app.UseStaticFiles();
    app.UseStaticFiles(new StaticFileOptions()
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "images")),
            RequestPath = new PathString("/images")
    });

    ...
}
````
When accessing the URL 'http://localhost:8080/images/controller.jpg'. The image with name 'controller.jpg' is displayed in the browser.
![image](/assets/images/backend/8612/images_serving.png){:width="700px"}  
### 4.3 Enabling Directory Browsing
In Startup.cs, make the changes as follows.
```
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
   if (env.IsDevelopment())
   {
       app.UseDeveloperExceptionPage();
   }

   app.UseStaticFiles();

   ...

   app.UseDirectoryBrowser(new DirectoryBrowserOptions()
   {
       FileProvider = new PhysicalFileProvider(
           Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "images")),
           RequestPath = new PathString("/images")
   });

   ...
}
```
When accessing the URL 'http://localhost:8080/images/'. All the images in '~/wwwwroot/images/' folder are displayed.
![image](/assets/images/backend/8612/directory browsing.png){:width="700px"}  
### 4.4 Getting Base URL in .NET Core
Base URL is the 'root' of the RESTful service. Take the API of getting all products as example, the full URL address is 'http://localhost:8080/api/products'. Here, 'http://localhost:8080/' is the base URL, which includes the host name(or ip address) and port number. It looks like a prefix for all APIs. We need this base URL to generate the full URL after image is uploaded to service. We will rely on the HttpContext to get the host and port number.

Register HttpContextAccessor in the Startup:
```c#
public void ConfigureServices(IServiceCollection services)
{
    ...

    services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
}
```
Then, have it injected in the constructor of controller class.
```c#
public class ProductsController : Controller
{
    private HttpContext _currentContext;

    public ProductsController(IHttpContextAccessor httpContextAccessor)
    {
        _currentContext = httpContextAccessor.HttpContext;
    }

    ...
}
```
Finally, create GetBaseUrl() method.
```c#
public string GetBaseUrl()
{
    var request = _currentContext.Request;
    var host = request.Host.ToUriComponent();
    var pathBase = request.PathBase.ToUriComponent();
    return $"{request.Scheme}://{host}{pathBase}";
}
```
### 4.5 Final Project Structure
The final structure of the Web API project.
![image](/assets/images/backend/8612/project_final.png){:width="320px"}  
We created 6 APIs and will test them through Postman, see next blog.

API                       | Description         | URL
--------------------------|---------------------|--------------
GET /api/products         | Get all products    | GET [http://localhost:8080/api/products](http://localhost:8080/api/products)
GET /api/products/{id}    | Get a product by ID | GET [http://localhost:8080/api/products/1](http://localhost:8080/api/products/1)
POST /api/products        | Add a new product   | POST [http://localhost:8080/api/products](http://localhost:8080/api/products)
PUT /api/products/{id}    | Update a product    | PUT [http://localhost:8080/api/products/1](http://localhost:8080/api/products/1)
DELETE /api/products/{id} | Delete a product    | DELETE [http://localhost:8080/api/products/1](http://localhost:8080/api/products/1)
POST /api/upload          | Upload an image     | POST [http://localhost:8080/api/upload](http://localhost:8080/api/upload)

## 5. Source Files
* [Source files of RESTful API(ASP.NET Core) on Github](https://github.com/jojozhuang/restful-api-aspnet)

## 6. References
* [Create a Web API with ASP.NET Core MVC and Visual Studio for Mac](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api-mac)
* [Routing to Controller Actions](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/routing)
* [Getting Started with EF Core on .NET Core Console App with a New database](https://docs.microsoft.com/en-us/ef/core/get-started/netcore/new-db-sqlite)
* [Choose the right return type for WebApi controllers](https://alastaircrabtree.com/choose-the-right-return-type-for-webapi-controllers/)
* [Getting the Web Root Path and the Content Root Path in ASP.NET Core](https://blog.mariusschulz.com/2016/05/22/getting-the-web-root-path-and-the-content-root-path-in-asp-net-core)
* [How can I get my webapp's base URL in ASP.NET MVC?](https://stackoverflow.com/questions/1288046/how-can-i-get-my-webapps-base-url-in-asp-net-mvc)
* [Migrating from ASP.NET Web API](https://docs.microsoft.com/en-us/aspnet/core/migration/webapi)
* [How to Upload Image Via WebApi](https://stackoverflow.com/questions/31839449/how-to-upload-image-via-webapi)
* [How to enable CORS in ASP.NET Core](https://stackoverflow.com/questions/31942037/how-to-enable-cors-in-asp-net-core)
* [Working with static files in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/static-files)
* [HTTP Status Code](https://github.com/aspnet/HttpAbstractions/blob/dev/src/Microsoft.AspNetCore.Http.Abstractions/StatusCodes.cs)
