---
layout: tutorial
key: tutorial
title: "Online Judge - Judging System"
index: 9031
subcategory: online-judge
date: 2018-05-04
tags: [spawn]
---

> Introduce how to build Judging System for this online judge app.

## 1. Structure
### 1.1 Supported Languages
For each question, we have multiple language specified solution. Currently, this online judge application supports three languages: Java, Javascript and Python.
![image](/assets/images/online-judge/9031/solution_project.png){:width="400px"}  
### 1.2 Test Case
For each question, there is one test case file shared by all solutions. For example, below is the test case for 'Two Sum' questions. There are 5 test cases in the test file. Each test case consists of three lines.
```raw
# ./server/solution/two-sum/testcase.txt
null
0
[0,0]
[]
0
[0,0]
[1,0,-1]
-1
[1,2]
[2,7,11,15]
9
[0,1]
[1,2,3,4,5,6,7,8,9,10]
19
[8,9]
[230,863,916,585,981,404,316,785,88,12,70,435,384,778,887,755,740,337,86,92,325,422,815,650,920,125,277,336,221,847,168,23,677,61,400,136,874,363,394,199,863,997,794,587,124,321,212,957,764,173,314,422,927,783,930,282,306,506,44,926,691,568,68,730,933,737,531,180,414,751,28,546,60,371,493,370,527,387,43,541,13,457,328,227,652,365,430,803,59,858,538,427,583,368,375,173,809,896,370,789]
542
[28,45]
```

Example of two sum:
```raw
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
Corresponding test case. The first line is the 'nums' array, the second line is the 'target' value and the third line is the expected result.
```raw
[2,7,11,15]
9
[0,1]
```
## 2. Solution Verifier
For each language, there are at least two files.
* Solution.java(js/py) - The solution for the question. Its content will be replaced by user's submitted solution.
* SolutionTester.java(js/py) - The test class to verify solution. It reads the test cases from 'testcase.txt' file and iterate them one by one, verify the input parameters against the expected result.

The following codes are the example for 'Two Sum' question. Other questions have the same structure.
### 2.1 Java
Solution.java
```java
// ./server/solution/two-sum/java/Solution.java
import java.util.HashMap;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] res = new int[]{0,0};
        if (nums == null || nums.length < 2) {
            return res;
        }

        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();

        for (int i = 0; i < nums.length; i++) {
            if(map.containsKey(nums[i])) {
                res[0] = map.get(nums[i]);
                res[1] = i;
                return res;
            } else {
                map.put(target - nums[i], i);
            }
        }
        return res;
    }
}
```
SolutionTester.java
```java
// ./server/solution/two-sum/java/SolutionTester.java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class SolutionTester {
    private static final String TESTCASE_FILE = "testcase.txt";
    private static final String TESTRESULT_FILE = "testresult.txt";

    public static void main(String[] args) {
        Solution solution = new Solution();

        //System.out.println("testTwoSum");

        boolean testResult = true;
        try {
            BufferedReader br = new BufferedReader(new FileReader(TESTCASE_FILE));
            try {
                String line;
                int count = 0;
                while ((line = br.readLine()) != null) {
                    int[] nums = ParserUtil.stringToIntegerArray(line);
                    line = br.readLine();
                    int target = Integer.parseInt(line);
                    line = br.readLine();
                    int[] expected = ParserUtil.stringToIntegerArray(line);
                    // create an test execution
                    int[] ret = solution.twoSum(nums, target);

                    testResult = Arrays.equals(expected, ret);
                    count++;

                    if (!testResult) {
                        String content = "[Fail]Failed at: Input: " + Arrays.toString(nums) + ", " + target + "; Your answer:" + Arrays.toString(ret) + "; Expected answer: " + Arrays.toString(expected);
                        System.out.println("[Fail]" + Arrays.toString(nums) + ", " + target + ";" + Arrays.toString(ret) + ";" + Arrays.toString(expected));
                        saveTestResult(content);
                        break;
                    }
                }
                if (testResult) {
                    System.out.println("[Success]Your solution passed all " + count +" test cases!");
                    saveTestResult("[Success]Your solution passed all " + count +" test cases!");
                }
            }
            catch (Exception io) {
                System.out.println(io.getMessage());
                printToFile(io);
            }
            finally {
                br.close();
            }
        }
        catch (IOException ioe) {
            System.out.println(ioe.getMessage());
            printToFile(ioe);
        } finally {
        }
    }

    public static void saveTestResult(String content) {
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(TESTRESULT_FILE));
            bw.write(content);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    public static void printToFile(Exception ex) {
        PrintWriter pw = null;
        try {
            pw = new PrintWriter(TESTRESULT_FILE);
            ex.printStackTrace(pw);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
            } catch (Exception ex2) {
                ex2.printStackTrace();
            }
        }
    }
}
```
### 2.2 Javascript
Solution.js
```javascript
// ./server/solution/two-sum/javascript/Solution.js
var twoSum = function(nums, target) {
  if (nums == null || nums.length < 2) {
    return [0, 0];
  }
  var ret = [];
  var exist = {};
  for (var i = 0; i < nums.length; i++) {
    if (typeof exist[target - nums[i]] !== "undefined") {
      ret.push(exist[target - nums[i]]);
      ret.push(i);
    }

    exist[nums[i]] = i;
  }

  return ret;
};

module.exports = twoSum;
```
SolutionTester.js
```javascript
// ./server/solution/two-sum/javascript/SolutionTester.js
const path = require("path");
const fs = require("fs");
const twoSum = require("./Solution.js");

// read test case from file
const file = path.resolve(__dirname, "testcase.txt");
const data = fs.readFileSync(file);
//console.log(data.toString());
const lines = data.toString().split("\n");
//console.log(lines);
var testcases = [];
for (let i = 0; i < lines.length; i = i + 3) {
  // convert string to number with map(Number)
  let nums = null;
  if (lines[i] !== "null") {
    nums = lines[i]
      .substring(1, lines[i].length - 1)
      .split(",")
      .map(Number);
  }
  let target = parseInt(lines[i + 1], 10);
  let expected = lines[i + 2]
    .substring(1, lines[i + 2].length - 1)
    .split(",")
    .map(Number);

  testcases.push({ nums, target, expected });
  //console.log(testcase);
}

let testresult = true;
for (let i = 0; i < testcases.length; i++) {
  const testcase = testcases[i];
  //console.log(testcase);
  var result = twoSum(testcase.nums, testcase.target);
  //console.log("result:", result);
  //console.log("testcase.expected:", testcase.expected);
  if (!isEqual(testcase.expected, result)) {
    const message =
      "[Fail][" +
      testcase.nums +
      "]," +
      testcase.target +
      ";[" +
      result +
      "];" +
      testcase.expected;
    testresult = false;
    console.log(message);
    break;
  }
}

if (testresult) {
  const message =
    "[Success]Your solution passed all " + testcases.length + " test cases!";
  console.log(message);
}

function isEqual(value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  var valueLen =
    type === "[object Array]" ? value.length : Object.keys(value).length;
  var otherLen =
    type === "[object Array]" ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  var compare = function(item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    } else {
      // Otherwise, do a simple comparison
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  };

  // Compare properties
  if (type === "[object Array]") {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }

  // If nothing failed, return true
  return true;
}
```
### 2.2 Python
Solution.py
```python
// ./server/solution/two-sum/python/Solution.py
class Solution(object):
    def twoSum(self, nums, target):
        if nums is None :
            return [0,0]
        if len(nums) <= 1:
            return [0,0]
        buff_dict = {}
        for i in range(len(nums)):
            if nums[i] in buff_dict:
                return [buff_dict[nums[i]], i]
            else:
                buff_dict[target - nums[i]] = i
```
SolutionTester.py
```python
// ./server/solution/two-sum/python/SolutionTester.py
import json
import Solution

def stringToIntegerList(input):
    return json.loads(input)

def stringToInt(input):
    return int(input)

def integerListToString(nums, len_of_list=None):
    if not len_of_list:
        len_of_list = len(nums)
    return json.dumps(nums[:len_of_list])

def main():
    with open('testcase.txt', "r") as f:
        lines = f.readlines()
    i = 0
    passall = True
    while i < len(lines) :
        line = lines[i]
        nums = stringToIntegerList(line)
        if (nums == "null") :
            nums = None
        #print nums
        line = lines[i+1]
        #print line
        target = stringToInt(line)
        line = lines[i+2]
        #print line
        expected = stringToIntegerList(line)

        ret = Solution.Solution().twoSum(nums, target)

        if (expected != ret) :
            if (nums is None) :
                strnums = 'null'
            else:
                strnums = integerListToString(nums)
            print "[Fail]" + strnums + ", " + str(target) + ";" + integerListToString(ret) + ";" + integerListToString(expected)
            passall = False
            break

        i = i + 3
        #print out

    if passall == True :
        print "[Success]Your solution passed all " + str(len(lines)/3) + " test cases!"

if __name__ == '__main__':
    main()
```
## 3. Judging Engine
We defined several runners for different languages. Use 'RunnerManager' to manage this runners.
![image](/assets/images/online-judge/9031/judging_engine.png){:width="400px"}  
### 3.1 Base Class
Runner.js
```javascript
// ./server/judgingengine/Runner.js
class Runner {
  constructor() {}

  run(file, directory, filename, extension, callback) {
    console.log("run");
  }
}

module.exports = Runner;
```
### 3.2 Java Runner
```javascript
// ./server/judgingengine/JavaRunner.js
const { spawn } = require("child_process");
const Runner = require("./Runner");
const exec = require("child_process").exec;

class JavaRunner extends Runner {
  sourceFile() {
    return this.sourcefile;
  }
  testFile() {
    return this.testfile;
  }

  constructor() {
    super();
    this.sourcefile = "Solution.java";
    this.testfile = "SolutionTester.java";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".java") {
      console.log(`${file} is not a java file.`);
    }
    this.compile(file, directory, filename, callback);
  }

  // compile java source file
  runtest(file, directory, filename, callback) {

    const argsCompile = [];
    argsCompile[0] = file;
    const runner = spawn("sh", argsCompile, { shell: true });
    runner.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
      callback("ok", String(data)); // 0, no error
    });
    runner.stderr.on("data", data => {
      console.log(`compile-stderr: ${String(data)}`);
      callback("err", String(data)); // 1, error
    });
    runner.on("close", data => {
      this.log(`close: ${data}`);
    });
  }

  // compile java source file
  compile(file, directory, filename, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const options2 = { classpath: directory };
    // var compiler = spawn('javac', ['CodeJava.java']);
    const argsCompile = [];
    argsCompile[0] = directory + "/ParserUtil.java";
    argsCompile[1] = directory + "/Solution.java";
    argsCompile[2] = file;
    console.log(argsCompile);
    const compiler = spawn("javac", argsCompile, options2);
    compiler.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on("data", data => {
      console.log(`compile-stderr: ${String(data)}`);
      callback("err_cmp", String(data)); // 1, compile error
    });
    compiler.on("close", data => {
      if (data === 0) {
        this.execute(filename, options, callback);
      }
    });
  }

  // execute the compiled class file
  execute(filename, options, callback) {
    const argsRun = [];
    argsRun[0] = filename;
    const executor = spawn("java", argsRun, options);
    executor.stdout.on("data", output => {
      const out = String(output);
      //console.log(`javaRunner->execute(): stdout:`);
      console.log(output);
      if (out.startsWith("[Success]") || out.startsWith("[Fail]")) {
        callback("ok", String(output)); // 0, no error
      }
    });
    executor.stderr.on("data", output => {
      //console.log(`javaRunner->execute(): stderr: ${String(output)}`);
      callback("err_exe", String(output)); // 2, execution failure
    });
    executor.on("close", output => {
      this.log(`javaRunner->execute(): close: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = JavaRunner;
```
### 3.3 Javascript Runner
```javascript
// ./server/judgingengine/JavaScriptRunner.js
const { spawn } = require("child_process");
const Runner = require("./Runner");

class JavaScriptRunner extends Runner {
  sourceFile() {
    return this.sourcefile;
  }
  testFile() {
    return this.testfile;
  }

  constructor() {
    super();
    this.sourcefile = "Solution.js";
    this.testfile = "SolutionTester.js";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".js") {
      console.log(`${file} is not a javascript file.`);
    }

    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);

    // node SolutionTester.js 1 0 -1 -1
    const executor = spawn("node", argsRun, options);
    executor.stdout.on("data", output => {
      const out = String(output);
      //console.log(`javaRunner->execute(): stdout:`);
      console.log(output);
      if (out.startsWith("[Success]") || out.startsWith("[Fail]")) {
        callback("ok", String(output)); // ok, no error
      }
    });
    executor.stderr.on("data", output => {
      console.log(`stderr: ${String(output)}`);
      callback("err_exe", String(output)); // err, execution failure
    });
    executor.on("close", output => {
      console.log(`stdout: ${output}`);
    });
  }
}

module.exports = JavaScriptRunner;
```
### 3.4 Python Runner
```javascript
// ./server/judgingengine/PythonRunner.js
const { spawn } = require("child_process");
const Runner = require("./Runner");

class PythonRunner extends Runner {
  sourceFile() {
    return this.sourcefile;
  }
  testFile() {
    return this.testfile;
  }

  constructor() {
    super();
    this.sourcefile = "Solution.py";
    this.testfile = "SolutionTester.py";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".py") {
      console.log(`${file} is not a python file.`);
    }
    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    console.log(`options: ${options}`);
    console.log(`argsRun: ${argsRun}`);
    const executor = spawn("python", argsRun, options);
    executor.stdout.on("data", output => {
      const out = String(output);
      console.log(`pythonRunner->execute(): stdout:`);
      console.log(output);
      if (out.startsWith("[Success]") || out.startsWith("[Fail]")) {
        callback("ok", String(output)); // ok, no error
      }
    });
    executor.stderr.on("data", output => {
      console.log(`stderr: ${String(output)}`);
      callback("err_exe", String(output)); // err, execution failure
    });
    executor.on("close", output => {
      console.log(`stdout: ${output}`);
    });
  }
}

module.exports = PythonRunner;
```
### 3.4 Runner Manager
Use 'factory' to create Runner. Save user's solution to file first, then call specific runner to compile and run it.
```javascript
// ./server/judgingengine/RunnerManager.js
const path = require("path");
const FileApi = require("../api/FileApi");
const CRunner = require("./CRunner");
const CppRunner = require("./CppRunner");
const JavaRunner = require("./JavaRunner");
const JavaScriptRunner = require("./JavaScriptRunner");
const PythonRunner = require("./PythonRunner");
const appRoot = require("app-root-path");
const moment = require("moment");
const os = require("os");

function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;

    if (lang === "c") {
      runner = new CRunner();
    } else if (lang === "c++") {
      runner = new CppRunner();
    } else if (lang === "java") {
      runner = new JavaRunner();
    } else if (lang === "javascript") {
      runner = new JavaScriptRunner();
    } else if (lang === "python") {
      runner = new PythonRunner();
    }

    return runner;
  };
}

module.exports = {
  run(question, lang, solution, callback) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());

    // copy all files in the question folder from solution folder
    const sourceDir = path.resolve(
      `${appRoot}`,
      "server",
      "solution",
      question
    );
    const targetDir = path.resolve(
      `${appRoot}`,
      "server",
      "judgingengine",
      "temp",
      question + "_" + lang + "_" + moment().toISOString() // 2013-02-04T22:44:30.652Z
    );

    // copy source code files
    FileApi.copyDirectory(path.join(sourceDir, lang), targetDir, err => {
      if (err) {
        callback("99", String(err)); // 99, system error
      }

      const testcaseFile = path.join(targetDir, "testcase.txt");
      // copy test case file
      FileApi.copyFile(
        path.join(sourceDir, "testcase.txt"),
        testcaseFile,
        err => {
          if (err) {
            callback("99", String(err)); // 99, system error
          }
          // save the solution to Solution.java
          const sourceFile = path.resolve(targetDir, runner.sourceFile());
          //console.log(`source file: ${sourceFile}`);
          const filename = path.parse(sourceFile).name; // main
          const extension = path.parse(sourceFile).ext; // .java
          //console.log(`filename: ${filename}`);
          //console.log(`extension: ${extension}`);

          if (lang == "javascript") {
            // get method name and export it
            const method = solution
              .substring(solution.indexOf("var") + 4, solution.indexOf("="))
              .trim();
            solution = solution + " " + "module.exports = " + method + ";";
            //solution = solution + os.EOL + " module.exports = reverseString;";
          }
          FileApi.saveFile(sourceFile, solution, () => {
            const testFile = path.resolve(targetDir, runner.testFile());
            const testFileName = path.parse(testFile).name; // main
            runner.run(testFile, targetDir, testFileName, extension, function(
              status,
              message
            ) {
              if (status == "ok") {
                // no error
                console.log("message");
                console.log(message);
                if (message.startsWith("[Success]")) {
                  callback("pass", message.slice(9)); // ok, pass
                } else {
                  callback("fail", message.slice(6)); // ok, fail
                }
              } else {
                callback(status, message);
              }
            });
          });
        }
      );
    });
  }
};
```

## 4. Usage
### 4.1 Route
```javascript
// ./server/routes/submission.js
var express = require("express");
var router = express.Router();

var submission_controller = require("../controllers/submission");

...

router.post("/run", submission_controller.submission_run);

module.exports = router;
```
### 4.2 Controller
Controller method to save the submission and call the 'run' method.
```javascript
// ./server/controllers/submission.js
exports.submission_run = function(req, res, next) {
  SleepUtil.sleep();
  //sleep.sleep(3); //sleep for 3 seconds
  var newsubmit = new Submission({
    username: req.body.username,
    questionname: req.body.questionname,
    language: req.body.language,
    solution: req.body.solution,
    status: "initial", // not submitted -> just created
    timeupdated: moment(new Date(Date.now())),
    timesubmitted: moment(new Date(Date.now())),
    runtime: 0
  });

  //console.log(newsubmit);

  Submission.findOne(
    {
      username: newsubmit.username,
      questionname: newsubmit.questionname,
      language: newsubmit.language,
      status: "initial"
    },
    function(err, submission) {
      if (err) {
        return next(err);
      }
      if (!submission) {
        // 1. Save the submission first
        newsubmit.save({ new: true }, function(err, newsubmit) {
          if (err) {
            return next(err);
          }
          // 3. Run
          run(req, res, next, newsubmit);
        });
      } else {
        // Update solution
        submission.solution = newsubmit.solution;
        submission.timeupdated = moment(new Date(Date.now()));
        Submission.findByIdAndUpdate(
          submission._id,
          { $set: submission },
          { new: true },
          function(err, submission) {
            if (err) return next(err);
            // 3. Run
            run(req, res, next, submission);
          }
        );
      }
    }
  );
};
```
Call judging engine to verify the solution. Calculate the time consumption, save all the results and send them back to client.
```javascript
// ./server/controllers/submission.js
function run(req, res, next, submission) {
  var start = moment(new Date(Date.now()));

  // 2. Then, run the solution to get the test result
  RunnerManager.run(
    submission.questionname,
    submission.language,
    submission.solution,
    function(status, message) {
      const result = {
        status,
        message
      };
      console.log(status);
      if (status == "pass" || status == "fail") {
        var end = moment(new Date(Date.now()));

        var ms = moment(end, "DD/MM/YYYY HH:mm:ss").diff(
          moment(start, "DD/MM/YYYY HH:mm:ss")
        );

        // 3. Find the submission
        Submission.findById(submission.id, function(err, submission) {
          // update status
          submission.status = status;
          submission.runtime = ms;
          submission.timesubmitted = moment(new Date(Date.now()));

          //console.log(submission);
          // 4. Update the submission
          submission.save(function(err) {
            if (err) return next(err);
            res.end(JSON.stringify(result));
          });
        });
      } else {
        res.end(JSON.stringify(result));
      }
    }
  );
}
```

## 5. Client(Angular)
### 5.1 Submit Event
Submit the solution and show the result to UI.
```typescript
// ./src/app/components/questions/algorithm-question.component.ts

...

onSubmitSolution() {
  this.testResult = -1;
  if (!this.validate2()) {
    return;
  }

  //Form is valid, now perform create or update
  let question = this.baseForm.value;
  this.printLog(question);
  let id = "";
  let solution = "";
  if (this.selectedLang == "java") {
    id = this.submitId1;
    solution = this.code1;
  } else if (this.selectedLang == "javascript") {
    id = this.submitId2;
    solution = this.code2;
  } else if (this.selectedLang == "python") {
    id = this.submitId3;
    solution = this.code3;
  }
  let submission = new Submission(
    id,
    this.username,
    this.uniquename,
    question.language,
    solution,
    "initial",
    new Date(),
    null,
    0
  );
  this.printLog(submission);

  // Submit solution
  this.submissionService.submitSolution(submission).subscribe(
    response => {
      this.printLog(response);
      if (response.status === "pass") {
        this.handleSuccess2(response.message);
        this.testResult = 10;
        this.resultMessage = response.message;
      } else {
        this.handleError2(response.message);
        this.testResult = 20;
        this.resultMessage = response.message;
      }
      // reset id to null to avoid update
      if (this.selectedLang == "java") {
        this.submitId1 = "";
      } else if (this.selectedLang == "javascript") {
        this.submitId2 = "";
      } else if (this.selectedLang == "python") {
        this.submitId3 = "";
      }
      this.refresh();
    },
    error => {
      this.handleError2(error);
    }
  );
}
```
### 5.2 Service
```typescript
// ./src/app/services/submission.service.ts
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { environment } from "../../environments/environment";

import { QuestionExt, Submission } from "./../models";

@Injectable()
export class SubmissionService {
  baseUrl = environment.apiUrl;
  apiUrl = this.baseUrl + "api/submission";

  ...

  //Submit solution
  submitSolution(submission: Submission): Observable<any> {
    return this.http.post(this.apiUrl + "/run", submission);
  }
}
```

## 6. Demo
Select one question to submit solution, two results. Either the solution passes all the test cases,
![image](/assets/images/online-judge/9031/pass.png)
or it fails for one of the test cases.
![image](/assets/images/online-judge/9031/fail.png)

## 7. References
### 7.1 Sample OnlineJudge
* [OnlineJudge](https://github.com/QingdaoU/OnlineJudge)
* [OnlineJudge Deploy](https://github.com/QingdaoU/OnlineJudgeDeploy)

### 7.2 Security
* [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)
* [4 Simple Steps to Secure Your Express Node Application](http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/)
* [csurf](https://www.npmjs.com/package/csurf)
* [SECCOMP wiki](https://en.wikipedia.org/wiki/Seccomp)
* [Seccomp security profiles for Docker](https://docs.docker.com/engine/security/seccomp/)
* [Compiling a program with limited library access](https://stackoverflow.com/questions/27731599/compiling-a-program-with-limited-library-access)
* [Online Judge 是如何解决判题端安全性问题的？](https://www.zhihu.com/question/23067497)
* [开发与维护好一个Online Judge需要学习哪些知识?](https://www.zhihu.com/question/27340709)

### 7.3 Others
* [Date manipulation - momentjs](http://momentjs.com/)
* [Child Processes on Node.js Document](https://nodejs.org/api/child_process.html)
