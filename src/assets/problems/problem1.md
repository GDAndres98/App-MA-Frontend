New Year is coming in Line World! In this world, there are n cells numbered by integers from $1$ to $n$, as a $1\times n$ board. People live in cells. However, it was hard to move between distinct cells, because of the difficulty of escaping the cell. People wanted to meet people who live in other cells.





Freddy has just built his own homepage and he was very happy. Now he wants to add a new feature
for his homepage, favorite time detector. With this feature, he can find out when most users visit his
homepage. He has successfully retrieved visiting time for each online user, but he didn’t know how to
find the time range when most users visit his page.\
Given $N,$ range of time when users visit his page, you’re going to help Freddy to find the time range
when most users visit his page.
---
# Input
Input begins with an integer $T,$ ($1 \leq T \leq 100$) denoting the number of cases. Each case begins with an integer $N,$ ($1 \leq N \leq 100$) denoting the number of user visiting Freddy's page. The next $N,$ lines each will contains the hour and minute when each user visit Freddy's page, '$ah$:$ai$ $bh$:$bi$' ($00 \leq ah, bh \leq 23$; $00 \leq ai, bi \leq 59$) denoting the beginning and end time, respectively. $ah$:$ai$ will always be equal to or smaller than $bh$:$bi$. $ah$, $ai$, $bh$ and $bi$ will always be two digits (leading zero when it is necessary).

# Output
For each case, print the time range when most users visit his page in '$sh$:$si$ $th$:$ti$' format where $sh$:$si$ is the beginning time and $th$:$ti$ is the end time. $sh$, $si$, $th$, $ti$ should be two digits (leading zero when it’s necessary). If there are two or more time ranges which have the same number of visiting users, output the first occurrence.

## Sample Input
```
2
3
00:00 10:25
13:07 15:09
09:00 14:00
3
19:00 19:30
19:31 20:00
19:15 19:45
```

## Sample Output

```
09:00 10:25
19:15 19:45
```