# nums = [1,2,3]
# it = iter(nums)
# print(next(it))
# print(next(it))
# print(next(it))


def gen():
    for i in range(3):
        yield i
for val in gen():
    print(val)


