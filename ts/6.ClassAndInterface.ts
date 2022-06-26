//类可以使用imolements来实现接口

//接口
interface Radios {
  switchRadio(trigger: boolean): void
}

interface Battery {
  checkBatteryStatus(): void
}

//接口的继承
interface RadioWithBattery extends Radios {
  checkBatteryStatus(): void
}

class Car implements Radios {
  switchRadio(trigger: boolean) {}
}
class Cellphone implements RadioWithBattery {
  switchRadio(trigger: boolean) {}
  checkBatteryStatus() {}
}
