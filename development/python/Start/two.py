n = int(input())
a = 0
b = 1
count = 0
while(n>count):
    c = a+b
    a = b
    b = c
    count+=1
print(a)
