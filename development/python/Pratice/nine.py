# def isPalindrome(s):
#     s = "".join(c.lower() for c in s if (c.isalpha()))
#     str = ""
#     for ch in s:
#         str=ch+str
#     if(str == s):
#         return True
#     else:
#         return False
    
# Str = input("Enter input : ")

# if(isPalindrome(Str)):
#     print("Palindrome")
# else:
#     print("Not a Palindrome")


# def sqr(n):
#     return n*n

# def even(n):
#     return n%2==0

# list2 = [1,2,3,4,5]

# list1 = list(map(sqr,list2))
# print(list1)

# list3 = list(filter(even,list2))
# print(list3)

from functools import reduce

nums = [1, 2, 3, 4, 5]

result = reduce(lambda x, y: x + y, nums)
print(result)