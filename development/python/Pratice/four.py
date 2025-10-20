# str = input("Enter your String : ")  # I love Python
# listt = str.split(" ")
# for i in range(len(listt)-1,-1,-1):
#     print(listt[i],end=" ")
# print()
# print(str)
# print(str[::-1])


# student = {"name":"Phani","age":22}
# print(student["name"])
# student["branch"] = "CSE"
# print(student)

# s = {1,2,2,3}
# print(s)  # {1,2,3}


import re

def count_word_frequencies_manual(text):
    words = re.findall(r'\b\w+\b', text.lower())

    word_counts = {}

    for word in words:
        if word in word_counts:
            word_counts[word] += 1
        else:
            word_counts[word] = 1 
    
    return word_counts

text = "This is a test. This test is only a test."
word_frequencies = count_word_frequencies_manual(text)
print(word_frequencies)



