var da = '2022-11-29'

var st = '06:00:00'

var et = '09:00:00'


var cmd = 'select * from apply where startdate=\'' + da + '\' AND ((\'' + st + '\' between st and et) OR (\'' + et + '\' between st and et) OR ( \'' + st + '\' < st AND \'' + et + '\' > et ));'

console.log(cmd)