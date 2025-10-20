class Car:
    def __init__(self, name):
        self.name = name
    def drive(self): 
        print(self.name + " driving")

c = Car("Tesla")
c.drive()