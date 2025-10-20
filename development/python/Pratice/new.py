import re

def count_word_frequencies_with_set(text):
    words = re.findall(r'\b\w+\b', text.lower())  
    
    word_set = {"hi","hi","bye","bye"} 
    word_counts = {}  
    
    for word in words:
        if word not in word_set:
            word_set.add(word)  
            print(word_set)
            word_counts[word] = 1
        else:
            word_counts[word] += 1
    
    return word_counts

text = "This is a test. This test is only a test."
word_frequencies = count_word_frequencies_with_set(text)
print(word_frequencies)
