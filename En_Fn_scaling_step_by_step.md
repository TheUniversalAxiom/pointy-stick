# Scaling of \(E_n\) and \(F_n\) (Step-by-step)

This note derives the scaling rules for the **Exponential component** \(E_n\) and the **Fibonacci component** \(F_n\), and then combines them in the Axiom coupling term:

\[
E_n\,(1+F_n)
\]

---

## 1) Given values for \(E_n\)

You provided the first terms:

\[
E_n = 1,\; 5,\; 17,\; 53,\; \dots
\]

### 1.1) Identify the recurrence

Check how each term is produced from the previous one:

- From \(1\) to \(5\):  
  \[
  5 = 3\cdot 1 + 2
  \]

- From \(5\) to \(17\):  
  \[
  17 = 3\cdot 5 + 2
  \]

- From \(17\) to \(53\):  
  \[
  53 = 3\cdot 17 + 2
  \]

So the pattern is consistent:

\[
\boxed{E_n = 3E_{n-1} + 2}
\]
with the seed:
\[
\boxed{E_0 = 1}
\]

---

## 2) Solve \(E_n = 3E_{n-1} + 2\) (closed form)

We solve the linear non-homogeneous recurrence.

### 2.1) Homogeneous solution

Ignore the constant \(+2\) for a moment:

\[
E_n^{(h)} = 3E_{n-1}^{(h)}
\]

So:

\[
E_n^{(h)} = C\,3^n
\]

### 2.2) Particular solution

Try a constant particular solution \(E_n^{(p)} = k\). Substitute:

\[
k = 3k + 2
\]

Solve:

\[
k - 3k = 2
\]
\[
-2k = 2
\]
\[
k = -1
\]

So:

\[
E_n^{(p)} = -1
\]

### 2.3) General solution

\[
E_n = E_n^{(h)} + E_n^{(p)} = C\,3^n - 1
\]

### 2.4) Use the seed \(E_0 = 1\)

Substitute \(n=0\):

\[
E_0 = C\,3^0 - 1 = C - 1
\]
\[
1 = C - 1
\]
\[
C = 2
\]

### 2.5) Final closed form

\[
\boxed{E_n = 2\cdot 3^n - 1}
\]

### 2.6) Quick verification

- \(n=0\): \(2\cdot 1 - 1 = 1\)  
- \(n=1\): \(2\cdot 3 - 1 = 5\)  
- \(n=2\): \(2\cdot 9 - 1 = 17\)  
- \(n=3\): \(2\cdot 27 - 1 = 53\)

Matches perfectly.

---

## 3) Define Fibonacci scaling \(F_n\)

Use the standard Fibonacci recurrence (with typical seeds):

\[
\boxed{F_0 = 1,\quad F_1 = 1}
\]
\[
\boxed{F_n = F_{n-1} + F_{n-2}}
\]

First terms:

\[
1,\; 1,\; 2,\; 3,\; 5,\; 8,\; 13,\; 21,\; \dots
\]

---

## 4) Combine them: \(E_n(1+F_n)\)

The coupling term is:

\[
\boxed{E_n(1+F_n)}
\]

Substitute the closed form for \(E_n\):

\[
\boxed{(2\cdot 3^n - 1)\,(1+F_n)}
\]

---

## 5) Small-\(n\) table (sanity check)

| \(n\) | \(E_n\) | \(F_n\) | \(1+F_n\) | \(E_n(1+F_n)\) |
|---:|---:|---:|---:|---:|
| 0 | 1 | 1 | 2 | 2 |
| 1 | 5 | 1 | 2 | 10 |
| 2 | 17 | 2 | 3 | 51 |
| 3 | 53 | 3 | 4 | 212 |
| 4 | 161 | 5 | 6 | 966 |

Where \(E_4\) is computed by the recurrence (or closed form):

- Recurrence: \(E_4 = 3\cdot 53 + 2 = 161\)  
- Closed form: \(E_4 = 2\cdot 3^4 - 1 = 2\cdot 81 - 1 = 161\)

---

## 6) Scaling intuition (optional)

- \(E_n\) grows like \(3^n\) (exponential base 3).
- \(F_n\) grows like \(\varphi^n\) where \(\varphi \approx 1.618\).

So the product roughly scales like:

\[
E_n(1+F_n) \sim 3^n\,\varphi^n = (3\varphi)^n
\]

and:

\[
3\varphi \approx 4.854
\]

---

## 7) Final boxed results

\[
\boxed{E_n = 3E_{n-1} + 2\quad (E_0=1)}
\]

\[
\boxed{E_n = 2\cdot 3^n - 1}
\]

\[
\boxed{F_n = F_{n-1} + F_{n-2}\quad (F_0=1,\;F_1=1)}
\]

\[
\boxed{E_n(1+F_n) = (2\cdot 3^n - 1)(1+F_n)}
\]
