import { exec } from "child_process"

export default {
    name: 'sleep',
    description: 'Puts my computer to sleep',
    permissions: ['OWNER'],
    run: async (client: any, message: any, args: any) => exec('rundll32.exe powrprof.dll,SetSuspendState 0,1,0')
    ,
}
