vowels = "aeiouAEIOU"
s = input()
vc = 0
cc = 0
for ch in s:
    if ch in vowels:
        vc += 1
    elif ch.isalpha():
        cc += 1
print(vc)
print(cc)