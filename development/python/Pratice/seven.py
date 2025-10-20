# import sys
# max_value = -sys.maxsize-1
# second = -sys.maxsize-1
# x_list = [1,2,3,4,5,6]
# for i in x_list:
#     if(max_value<i):
#         second = max_value
#         max_value = i
#     elif (i > second and i != max_value):
#         second = i    
# print(second) 


text = input("Enter first string : ")
text2 = input("Enter second string : ")

text = ''.join(c.lower() for c in text if c.isalpha())
text2 = "".join(c.lower() for c in text2 if c.isalpha())
if len(text) != len(text2):
    print("No Anagram")
else:
    count = [0]*26
    for ch,ch1 in zip(text,text2):
        count[ord(ch.lower())-ord('a')] += 1
        count[ord(ch1.lower())-ord('a')] -= 1

    flag = True
    for i in count:
        if(i!=0):
            flag = False
            break
    if(flag):
        print("anagram")
    else:
        print("No Anagram")
