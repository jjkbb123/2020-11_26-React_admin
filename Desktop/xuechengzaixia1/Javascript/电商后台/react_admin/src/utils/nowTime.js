let time 
export default function nowTime(setTime) {
  if(!setTime) return null
  time = new Date(setTime)
  return (
    time.getFullYear()+'-'
  +(time.getMonth()+1)+'-'+time.getDay()+' '
  +time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
  )
}