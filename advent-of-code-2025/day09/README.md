## Day 9: Movie Theater 

You slide down the [firepole](https://en.wikipedia.org/wiki/Fireman's_pole)![Attachment.tiff](Attachment.tiff) in the corner of the playground and land in the North Pole base movie theater!

The movie theater has a big tile floor with an interesting pattern. Elves here are redecorating the theater by switching out some of the square tiles in the big grid they form. Some of the tiles are red; the Elves would like to find the largest rectangle that uses red tiles for two of its opposite corners. They even have a list of where the red tiles are located in the grid (your puzzle input).

For example:

```
7,1  
11,1  
11,7  
9,7  
9,5  
2,5  
2,3  
7,3  
```

Showing red tiles as # and other tiles as ., the above arrangement of red tiles would look like this:

```
..............  
.......#...#..  
..............  
..#....#......  
..............  
..#......#....  
..............  
.........#.#..  
..............  
```

You can choose any two red tiles as the opposite corners of your rectangle; your goal is to find the largest rectangle possible.



For example, you could make a rectangle (shown as O) with an area of 24 between 2,5 and 9,7:

```
..............  
.......#...#..  
..............  
..#....#......  
..............  
..OOOOOOOO....  
..OOOOOOOO....  
..OOOOOOOO.#..  
..............  
```

Or, you could make a rectangle with area 35 between 7,1 and 11,7:

```
..............  
.......OOOOO..  
.......OOOOO..  
..#....OOOOO..  
.......OOOOO..  
..#....OOOOO..  
.......OOOOO..  
.......OOOOO..  
..............  
```

You could even make a thin rectangle with an area of only 6 between 7,3 and 2,3:

```
..............  
.......#...#..  
..............  
..OOOOOO......  
..............  
..#......#....  
..............  
.........#.#..  
..............  
```

Ultimately, the largest rectangle you can make in this example has area 50. One way to do this is between 2,5 and 11,1:

```
..............  
..OOOOOOOOOO..  
..OOOOOOOOOO..  
..OOOOOOOOOO..  
..OOOOOOOOOO..  
..OOOOOOOOOO..  
..............  
.........#.#..  
..............  
```

Using two red tiles as opposite corners, what is the largest area of any rectangle you can make?

To begin, [get your puzzle input](https://adventofcode.com/2025/day/9/input)![Attachment.tiff](Attachment.tiff).

### **— Part Two —**





It turns out the red tiles in your list are not scattered randomly – they mark the corners of a large continuous shape on the floor. If you connect each pair of consecutive red tiles in the input (and connect the last tile back to the first) with green tiles, they form a continuous closed loop, and all the tiles inside that loop are filled with green as well.



Given this enclosed area, the Elves now want to find the largest rectangle that fits completely within it (with edges aligned to the grid), once again using red tiles as the rectangle’s opposite corners.



*What is the area of the largest rectangle you can find that lies entirely within the area surrounded by the red tiles?*



(Although it hasn’t changed, you can still [get your puzzle input](https://adventofcode.com/2025/day/9/input)![Attachment.tiff](Attachment.tiff).)





