# text = input()
# rev  = text[::-1]
# if(text == rev ):
#     print("equal")
# else:
#     print("Not equal")
  
  
text = input().replace(" ","").lower()
rev  = ""
for ch in text:
    rev = ch + rev
if(rev == text):
    print("equal")
else:
    print("Not equal")


try:
    n = int(input("Enter number: "))
    print(10/n)
except ZeroDivisionError:
    print("Can't divide by zero")
finally:
    print("Done")
