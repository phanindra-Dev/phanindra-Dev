# for idx, val in enumerate(['a','b','c'],1):
#     print(idx, val)

# fruits = ["apple", "banana", "cherry"]
# for i, f in enumerate(fruits, start=1):
#     print(i, f)

# for name, score in zip(['A','B','C'],[1,2,3]):
#     print(name, score)

# a = [1,2,3]
# b = [4,5]
# print(list(zip(a,b)))



# l = [10,20,30,40,50]
# print(l[1:3])
# print(l[-1])

# def add_item(item, lst= None):
#     if lst is None:
#         lst = []
#     lst.append(item)
#     return lst


# print(add_item(1))
# print(add_item(2))
# print(add_item(3))


# # list comprehension
# squares = [x*2 for x in range(1,5)]
# print(squares)

# # Dict comprehension
# dic = {x*2 for x in range(1,5)}
# print(dic)

# # Set comprehension
# se = {x*2 for x in range(1,5)}
# print(se)


# def print_names(*args):
#     for name in args:
#         print(name)

# print_names("Alice", "Bob", "Charlie")
# Output:
# Alice
# Bob
# Charlie

# def print_info(**kwargs):
#     for key, value in kwargs.items():
#         print(f"{key}: {value}")    

# print_info(name="Alice", age=25)
# Output:
# name: Alice
# age: 25



# import copy
# a = [[1,2],[3,4]]
# b = copy.copy(a)
# c = copy.deepcopy(a)
# b[0][0] = 99
# print(a, b, c)


# def append_item(x, lst=None):
#     if lst is None:
#         lst = []
#     lst.append(x)
#     return lst

# print(append_item(1))
# print(append_item(2))
# print(append_item(3))


#List Comprehensions
# lst = list([x for x in range(1,21) if x%2==0])
# print(lst)


# dict Comprehensions
# dic = {x:x**2 for x in range(1,6)}
# print(dic)

