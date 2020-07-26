---
layout: tutorial
key: tutorial
title: "Mermaid Cheat Sheet"
index: 9724
subcategory: uncategorized
date: 2018-09-18
tags: [Mermaid]
mermaid: true
---

> Cheat Sheet for Mermaid.

## 1. Flowcharts
A flowchart is a type of diagram that represents an algorithm, workflow or process. The flowchart shows the steps as boxes of various kinds, and their order by connecting the boxes with arrows. This diagrammatic representation illustrates a solution model to a given problem.
### 1.1 Graph
Possible directions are:
* `TB` - top bottom
* `BT` - bottom top
* `RL` - right left
* `LR` - left right
* `TD` - same as TB

<table>
  <thead>
    <tr>
      <th>Direction</th>
      <th>Diagram</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TB</td>
      <td><div class="mermaid">graph TB;A-->B;</div></td>
      <td>
        <pre class="highlight">graph TB;<br/>    A-->B;</pre>
      </td>
    </tr>
    <tr>
      <td>BT</td>
      <td><div class="mermaid">graph BT;A-->B;</div></td>
      <td>
        <pre class="highlight">graph BT;<br/>    A-->B;</pre>
      </td>
    </tr>
    <tr>
      <td>RL</td>
      <td><div class="mermaid">graph RL;A-->B;</div></td>
      <td>
        <pre class="highlight">graph RL;<br/>    A-->B;</pre>
      </td>
    </tr>
    <tr>
      <td>LR</td>
      <td><div class="mermaid">graph LR;A-->B;</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A-->B;</pre>
      </td>
    </tr>
    <tr>
      <td>TD</td>
      <td><div class="mermaid">graph TD;A-->B;</div></td>
      <td>
        <pre class="highlight">graph TD;<br/>    A-->B;</pre>
      </td>
    </tr>
  </tbody>
</table>

### 1.2 Nodes & shapes
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Diagram</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Node(Default)</td>
      <td><div class="mermaid">graph LR;id;</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    id;</pre>
      </td>
    </tr>
    <tr>
      <td>Node with Text</td>
      <td><div class="mermaid">graph LR;id1[This is the text in the box]</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    id1[This is the text in the box]</pre>
      </td>
    </tr>
    <tr>
      <td>Node with Round Edges</td>
      <td><div class="mermaid">graph LR;id1(This is the text in the box)</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    id1(This is the text in the box)</pre>
      </td>
    </tr>
    <tr>
      <td>Node in Circle Form</td>
      <td><div class="mermaid">graph LR;id1((This is the text in the circle))</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    id1((This is the text in the circle))</pre>
      </td>
    </tr>
    <tr>
      <td>Node in Asymmetric Shape</td>
      <td><div class="mermaid">graph LR;id1>This is the text in the box]</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    id1>This is the text in the box]</pre>
      </td>
    </tr>
    <tr>
      <td>Node in Rhombus Form</td>
      <td><div class="mermaid">graph LR;id1{This is the text in the box}</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    id1{This is the text in the box}</pre>
      </td>
    </tr>
  </tbody>
</table>

### 1.3 Links Between Nodes
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Diagram</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Link with Arrow Head</td>
      <td><div class="mermaid">graph LR;A-->B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A-->B</pre>
      </td>
    </tr>
    <tr>
      <td>Open Link</td>
      <td><div class="mermaid">graph LR;A---B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A---B</pre>
      </td>
    </tr>
    <tr>
      <td>Text on Links(1)</td>
      <td><div class="mermaid">graph LR;A-- This is the text ---B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A-- This is the text ---B</pre>
      </td>
    </tr>
    <tr>
      <td>Text on Links(2)</td>
      <td><div class="mermaid">graph LR;A---|This is the text|B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A---|This is the text|B</pre>
      </td>
    </tr>
    <tr>
      <td>Link with Arrow Head and Text(1)</td>
      <td><div class="mermaid">graph LR;A-->|text|B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A-->|text|B</pre>
      </td>
    </tr>
    <tr>
      <td>Link with Arrow Head and Text(2)</td>
      <td><div class="mermaid">graph LR;A-- text -->B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A-- text -->B</pre>
      </td>
    </tr>
    <tr>
      <td>Dotted Link</td>
      <td><div class="mermaid">graph LR;A-.->B;</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A-.->B;</pre>
      </td>
    </tr>
    <tr>
      <td>Dotted Link with Text</td>
      <td><div class="mermaid">graph LR;A-. text .-> B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A-. text .-> B</pre>
      </td>
    </tr>
    <tr>
      <td>Thick Link</td>
      <td><div class="mermaid">graph LR;A ==> B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A ==> B</pre>
      </td>
    </tr>
    <tr>
      <td>Thick link with text</td>
      <td><div class="mermaid">graph LR;A == text ==> B</div></td>
      <td>
        <pre class="highlight">graph LR;<br/>    A == text ==> B</pre>
      </td>
    </tr>
  </tbody>
</table>
### 1.4 Subgraphs
Syntax:
~~~markdown
subgraph title
    graph definition
end
~~~
Example:
~~~markdown
graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
~~~
<div class="mermaid">
graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
</div>

## 2. Sequence Diagrams
A Sequence diagram is an interaction diagram that shows how processes operate with one another and in what order.
### 2.1 Participants
The participants or actors are rendered in order of appearance in the diagram source text.
~~~markdown
sequenceDiagram
    participant Alice
    participant John
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
~~~
<div class="mermaid">
sequenceDiagram
    participant Alice
    participant John
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
</div>
You can specify the actor's order of appearance to show the participants in a different order.
~~~markdown
sequenceDiagram
    participant John
    participant Alice
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
~~~
<div class="mermaid">
sequenceDiagram
    participant John
    participant Alice
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
</div>
The participants can be defined implicitly without specifying them with the `participant` keyword.
~~~markdown
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
~~~
<div class="mermaid">
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
</div>
### 2.2 Aliases
The participant can have a convenient identifier and a descriptive label.
~~~markdown
sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J-->>A: Great!
~~~
<div class="mermaid">
sequenceDiagram
    participant A as Alice
    participant J as John
    A->>J: Hello John, how are you?
    J-->>A: Great!
</div>
### 2.3 Messages
Messages can be of two displayed either solid or with a dotted line.
```raw
[Actor][Arrow][Actor]:Message text
```
There are six types of arrows currently supported:

Arrow Type | Description
-----------|------------------------------------------
->         | Solid line without arrow
-->        | Dotted line without arrow
->>        | Solid line with arrowhead
-->>       | Dotted line with arrowhead
-x         | Solid line with a cross at the end (async)
--x        | Dotted line with a cross at the end (async)

### 2.4 Activations
Activate and deactivate an actor.
~~~markdown
sequenceDiagram
    Alice->>John: Hello John, how are you?
    activate John
    John-->>Alice: Great!
    deactivate John
~~~
<div class="mermaid">
sequenceDiagram
    Alice->>John: Hello John, how are you?
    activate John
    John-->>Alice: Great!
    deactivate John
</div>
Shortcut notation by appending `+/-` suffix to the message arrow.
~~~markdown
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    John-->>-Alice: Great!
~~~
<div class="mermaid">
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    John-->>-Alice: Great!
</div>
Activations can be stacked for same actor:
~~~markdown
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
~~~
<div class="mermaid">
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
</div>
### 2.5 Notes
Add notes to a sequence diagram by the notation `Note`.
```raw
Note [ right of | left of | over ] [Actor]: Text in note content
```
1) Right Side
~~~markdown
sequenceDiagram
    participant John
    Note right of John: Text in note
~~~
<div class="mermaid">
sequenceDiagram
    participant John
    Note right of John: Text in note
</div>
2) Left Side
~~~markdown
sequenceDiagram
    participant John
    Note left of John: Text in note
~~~
<div class="mermaid">
sequenceDiagram
    participant John
    Note left of John: Text in note
</div>
3) Over
~~~markdown
sequenceDiagram
    participant John
    Note over John: Text in note
~~~
<div class="mermaid">
sequenceDiagram
    participant John
    Note over John: Text in note
</div>
4) Create notes spanning two participants
~~~markdown
sequenceDiagram
    Alice->>John: Hello John, how are you?
    Note over Alice,John: A typical interaction
~~~
<div class="mermaid">
sequenceDiagram
    Alice->>John: Hello John, how are you?
    Note over Alice,John: A typical interaction
</div>
### 2.6 Loops
Express loops in a sequence diagram by the notation `loop`.
```raw
loop Loop text
... statements ...
end
```
~~~markdown
sequenceDiagram
    Alice->John: Hello John, how are you?
    loop Every minute
        John-->Alice: Great!
    end
~~~
<div class="mermaid">
sequenceDiagram
    Alice->John: Hello John, how are you?
    loop Every minute
        John-->Alice: Great!
    end
</div>
### 2.7 Alt
Express alternative paths in a sequence diagram by the notation `alt`.
~~~markdown
alt Describing text
... statements ...
else
... statements ...
end
~~~
Or, if there is sequence that is optional (if without else).
~~~markdown
opt Describing text
... statements ...
end
~~~
Example:
~~~markdown
sequenceDiagram
    Alice->>John: Hello John, how are you?
    alt is sick
        John->>Alice: Not so good :(
    else is well
        John->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        John->>Alice: Thanks for asking
    end
~~~
<div class="mermaid">
sequenceDiagram
    Alice->>John: Hello John, how are you?
    alt is sick
        John->>Alice: Not so good :(
    else is well
        John->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        John->>Alice: Thanks for asking
    end
</div>

## 3. Gant Diagrams
A Gantt chart is a type of bar chart, first developed by Karol Adamiecki in 1896, and independently by Henry Gantt in the 1910s, that illustrates a project schedule. Gantt charts illustrate the start and finish dates of the terminal elements and summary elements of a project.
~~~markdown
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    First Task       :a1, 2018-07-01, 30d
    Another Task     :after a1, 20d
    section Another
    Second Task      :2018-07-12, 12d
    Third Task       : 24d
~~~
<div class="mermaid">
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    First Task       :a1, 2018-07-01, 30d
    Another Task     :after a1, 20d
    section Another
    Second Task      :2018-07-12, 12d
    Third Task       : 24d
</div>

```raw
gantt
       dateFormat  YYYY-MM-DD
       title Adding GANTT diagram functionality to mermaid

       section A section
       Completed task            :done,    des1, 2018-01-06,2018-01-08
       Active task               :active,  des2, 2018-01-09, 3d
       Future task               :         des3, after des2, 5d
       Future task2              :         des4, after des3, 5d

       section Critical tasks
       Completed task in the critical line :crit, done, 2018-01-06,24h
       Implement parser and jison          :crit, done, after des1, 2d
       Create tests for parser             :crit, active, 3d
       Future task in critical line        :crit, 5d
       Create tests for renderer           :2d
       Add to mermaid                      :1d

       section Documentation
       Describe gantt syntax               :active, a1, after des1, 3d
       Add gantt diagram to demo page      :after a1  , 20h
       Add another diagram to demo page    :doc1, after a1  , 48h

       section Last section
       Describe gantt syntax               :after doc1, 3d
       Add gantt diagram to demo page      :20h
       Add another diagram to demo page    :48h
```
<div class="mermaid">
gantt
       dateFormat  YYYY-MM-DD
       title Adding GANTT diagram functionality to mermaid

       section A section
       Completed task            :done,    des1, 2018-01-06,2018-01-08
       Active task               :active,  des2, 2018-01-09, 3d
       Future task               :         des3, after des2, 5d
       Future task2              :         des4, after des3, 5d

       section Critical tasks
       Completed task in the critical line :crit, done, 2018-01-06,24h
       Implement parser and jison          :crit, done, after des1, 2d
       Create tests for parser             :crit, active, 3d
       Future task in critical line        :crit, 5d
       Create tests for renderer           :2d
       Add to mermaid                      :1d

       section Documentation
       Describe gantt syntax               :active, a1, after des1, 3d
       Add gantt diagram to demo page      :after a1  , 20h
       Add another diagram to demo page    :doc1, after a1  , 48h

       section Last section
       Describe gantt syntax               :after doc1, 3d
       Add gantt diagram to demo page      :20h
       Add another diagram to demo page    :48h
</div>

## 4. Demos
### 4.1 Basic Flowchart
```raw
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
```
<div class="mermaid">
graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D
</div>
### 4.2 Flowchart with Decision
```raw
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
```
<div class="mermaid">
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
</div>
### 4.3 Larger Flowchart with Some Styling
```raw
graph TB
    sq[Square shape] --> ci((Circle shape))

    subgraph A
        od>Odd shape]-- Two line<br/>edge comment --> ro
        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)
        di==>ro2(Rounded square shape)
    end

    %% Notice that no text in shape are added here instead that is appended further down
    e --> od3>Really long text with linebreak<br>in an Odd shape]

    %% Comments after double percent signs
    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)

    cyr[Cyrillic]-->cyr2((Circle shape Начало));

     classDef green fill:#9f6,stroke:#333,stroke-width:2px
     classDef orange fill:#f96,stroke:#333,stroke-width:4px
     class sq,e green
     class di orange
```
<div class="mermaid">
graph TB
    sq[Square shape] --> ci((Circle shape))

    subgraph A
        od>Odd shape]-- Two line<br/>edge comment --> ro
        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)
        di==>ro2(Rounded square shape)
    end

    %% Notice that no text in shape are added here instead that is appended further down
    e --> od3>Really long text with linebreak<br>in an Odd shape]

    %% Comments after double percent signs
    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-\*ز)

    cyr[Cyrillic]-->cyr2((Circle shape Начало));

     classDef green fill:#9f6,stroke:#333,stroke-width:2px
     classDef orange fill:#f96,stroke:#333,stroke-width:4px
     class sq,e green
     class di orange
</div>
### 4.4 Basic Sequence Diagram
```raw
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
```
<div class="mermaid">
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
</div>
### 4.5 Message to Self in Loop
```raw
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts<br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```
<div class="mermaid">
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts<br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
</div>

## 5. References
* [Mermaid Flowcharts - Basic Syntax](https://mermaidjs.github.io/#/flowchart)
* [Mermaid Sequence diagrams](https://mermaidjs.github.io/#/sequenceDiagram)
* [Mermaid Gant diagrams](https://mermaidjs.github.io/#/gantt)
