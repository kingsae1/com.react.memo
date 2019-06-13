/**
 * Created by kingsae1004@gmail.com on 03/06/2019
 */
export default {
    dateFormat(date) {
        // UI 플립북에 정의된 Format
        const tempDate = new Date(date);
        return tempDate.getFullYear() + '.' + (tempDate.getMonth() + 1) + "." + tempDate.getDate()

    }
}
