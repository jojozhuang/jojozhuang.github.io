---
layout: tutorial
key: programming
title: "Java Core - BitSet"
index: 2322
subcategory: java-core
date: 2017-01-12
tags: [BitSet, BitMap]
---

> BitSet, nextClearBit, nextSetBit

## 1. BitSet
The `BitSet` class creates a special type of array that holds bit values. The BitSet array can increase in size as needed.

Common Methods:
* `and(BitSet bitSet)`: ANDs the contents of the invoking BitSet object with those specified by bitSet. The result is placed into the invoking object.
* `or(BitSet bitSet)`: ORs the contents of the invoking BitSet object with that specified by bitSet. The result is placed into the invoking object.
* `xor(BitSet bitSet)`: XORs the contents of the invoking BitSet object with that specified by bitSet. The result is placed into the invoking object.
* `get(int index)`: Returns the current state of the bit at the specified index.
* `set(int index)`: Sets the bit specified by index.
* `size()`: Returns the number of bits in the invoking BitSet object.
* `length()`: Returns the number of bits required to hold the contents of the invoking BitSet. This value is determined by the location of the last 1 bit.
* `isEmpty()`: Returns true if all bits in the invoking object are zero.
* `clear()`: Zeros all bits.
* `nextClearBit(int startIndex)`: Returns the index of the next cleared bit, (that is, the next zero bit), starting from the index specified by startIndex.
* `nextSetBit(int startIndex)`: Returns the index of the next set bit (that is, the next 1 bit), starting from the index specified by startIndex. If no bit is set, -1 is returned.

## 2. Example
```java
import java.util.BitSet;

public class BitSetExample {
    public static void main(String args[]) {
        BitSet bits1 = new BitSet(16);
        BitSet bits2 = new BitSet(16);

        // set some bits
        for (int i = 0; i < 16; i++) {
            if ((i % 2) == 0) {
                bits1.set(i);
            }
            if ((i % 5) != 0) {
                bits2.set(i);
            }
        }

        System.out.println("Initial pattern in bits1: " + bits1); // {0, 2, 4, 6, 8, 10, 12, 14}
        System.out.println("Initial pattern in bits2: " + bits2); // {1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14}
        // bits1 = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
        // bits2 = [0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0]

        // AND bits
        bits2.and(bits1);
        System.out.println("bits2 AND bits1: " + bits2); // {2, 4, 6, 8, 12, 14}
        // bits1 = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
        // bits2 = [0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0]

        // OR bits
        bits2.or(bits1);
        System.out.println("bits2 OR bits1:  " + bits2); // {0, 2, 4, 6, 8, 10, 12, 14}
        // bits1 = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
        // bits2 = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]

        // XOR bits
        bits2.xor(bits1);
        System.out.println("bits2 XOR bits1: " + bits2); // {}
        // bits1 = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
        // bits2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

        System.out.println("bits1's state: " + convert(bits1, 16)); // 1010101010101010
        System.out.println("bits2's state: " + convert(bits2, 16)); // 0000000000000000

        // Cardinality
        System.out.println("bits1's cardinality: " + bits1.cardinality()); // 8
        System.out.println("bits2's cardinality: " + bits2.cardinality()); // 0

        // Get
        System.out.println("The state of index 2 in bits1 is: " + bits1.get(2)); // 8
        System.out.println("The state of index 2 in bits2 is: " + bits2.get(2)); // 8

        // Size
        System.out.println("bits1's size: " + bits1.size()); // 64
        System.out.println("bits2's size: " + bits2.size()); // 64

        // Length
        System.out.println("bits1's length: " + bits1.length()); // 15
        System.out.println("bits2's length: " + bits2.length()); // 0

        // isEmpty
        System.out.println("Is bits1 empty? " + bits1.isEmpty()); // false
        System.out.println("Is bits2 empty? " + bits2.isEmpty()); // true

        // nextClearBit
        System.out.println("The next zero bit for index 2 of bits1? " + bits1.nextClearBit(2)); // 3
        System.out.println("The next zero bit for index 2 of bits2? " + bits2.nextClearBit(2)); // 2

        // nextSetBit
        System.out.println("The next one bit for index 2 of bits1? " + bits1.nextSetBit(2)); // 2
        System.out.println("The next one bit for index 2 of bits2? " + bits2.nextSetBit(2)); // -1
    }

    public static String convert(BitSet bits, int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; ++i) {
            sb.append(bits.get(i) ? "1": "0");
        }
        return sb.toString();
    }
}
```
Output.
```raw
Initial pattern in bits1: {0, 2, 4, 6, 8, 10, 12, 14}
Initial pattern in bits2: {1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14}
bits2 AND bits1: {2, 4, 6, 8, 12, 14}
bits2 OR bits1:  {0, 2, 4, 6, 8, 10, 12, 14}
bits2 XOR bits1: {}
bits1's state: 1010101010101010
bits2's state: 0000000000000000
bits1's cardinality: 8
bits2's cardinality: 0
The state of index 2 in bits1 is: true
The state of index 2 in bits2 is: false
bits1's size: 64
bits2's size: 64
bits1's length: 15
bits2's length: 0
Is bits1 empty? false
Is bits2 empty? true
The next zero bit for index 2 of bits1? 3
The next zero bit for index 2 of bits2? 2
The next one bit for index 2 of bits1? 2
The next one bit for index 2 of bits2? -1
```

## 3. Source Files
* [Source files for Java BitSet on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-bitset)

## 4. References
* [Java - The BitSet Class](https://www.tutorialspoint.com/java/java_bitset_class.htm)
