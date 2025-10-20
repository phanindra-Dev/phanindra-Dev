# x = int(input("Enter number: "))
# print("Square:", x*x)
# a = int(input("Enter number a: "))
# b = int(input("Enter number b: "))

# name = "Phani"
# print(a, b, name)

# for i in range(1,6,2):
#     print(i,end=" ")
# print()

# b = list(input("Hlo :"))
# print(b)

# s = {1,2,3,4,5}
# print(s)

# x_list = input("Enter number: ")
# x_list = [int(i) for i in x_list.split(",")]
# print(x_list)

# for item in x_list:
#     print(item,end=" ")
    
# x_tuble = input("Enter number of tuble: ")
# x_tuble = tuple(int(i) for i in x_tuble.split(","))
# print(x_tuble)


x_dict_input = input("Enter a dictionary (key:value pairs, separated by commas): ")
x_dict = dict(item.split(":") for item in x_dict_input.split(","))
print(x_dict)

print("Keys : ",end="")

for key in x_dict:
    print(key,end=" ")
    
print()
 
print("Values : ",end="")
for value in x_dict.values():
    print(value,end=" ")
print()
for k, v in x_dict.items():
    print(k, ":", v)