export function uuidConverter(i:string):string{
  let val = i.substring(0,8)+"-"
  val+=i.substring(8,12)+"-"
  val+=i.substring(12,16)+"-"
  val+=i.substring(16,20)+"-"
  val+=i.substring(20);
  return val;
}
