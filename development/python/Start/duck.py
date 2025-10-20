class Bird:
    def fly(self): print("Bird flying")

class Airplane:
    def fly(self): print("Airplane flying")

def lift_off(obj):
    obj.fly()

lift_off(Bird())
lift_off(Airplane())   # both work



nums = [1,2,3,4,5]

# # map → applies function to each element
# print(list(map(lambda x: x**2, nums)))

# # filter → keeps only those that match condition
# print(list(filter(lambda x: x%2==0, nums)))

# # sorted with key
# names = ["alex", "John", "bob"]
# print(sorted(names, key=lambda x: x.lower()))

# def fun(x):
#     x = x**2
#     return x

# print(list(map(fun,[1,2,3,4])))


# names = ["alex", "John", "bob"]
# print(sorted(names, key=lambda x: x.lower()))

print(list(filter(lambda x : x%2==0,nums)))