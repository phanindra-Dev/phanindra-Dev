def outer_func(x):
    def inner_func(y):
        return x + y    # x is remembered
    return inner_func

add5 = outer_func(5)
print(add5(10))  # 15
