import https from '@/https.js'

const attachApi = {

    // 附件API服务器地址
    baseUrl: '/ifs',

    /**
     * 根据对象名称、对象记录ID、附件类型 查询获取附件列表
     * @param params = {
     *     object_keyid: string 对象记录ID,
     *     object_name: string 对象名称,
     *     attach_class: array 附件类型
     * }
     * @returns {Promise<*|{}>}
     */
    select: async function(params){
        let {   
            object_keyid,
            object_name,
            attach_class
        } = params;
        
        let values = await https.fetchGet(this.baseUrl + "/ifs/attach/select",{   
            object_keyid,
            object_name,
            attach_class
        });
        return await values.data || {};
    },

    /**
     * 插入一条附件记录
     * @param attach    附件对象
     * @returns {Promise<*|{}>}
     */
    insert: async function(attach){
        let values = await https.fetchPost(this.baseUrl + "/ifs/attach/update",attach);
        return values.data || {};
    },
    
    /**
     * 更新附件记录备注信息
     * @param attachs    附件对象数组
     * @returns {Promise<*|{}>}
     */
    updateMemo: async function(attachs){
        let values = await https.fetchPost(this.baseUrl + "/ifs/attach/updateMemo",attachs);
        return values.data || {};
    },

    /**
     * 删除一条附件记录
     * @param attach_id 附件记录ID
     * @returns {Promise<*|{}>}
     */
    deleteAttach: async function(attach_id){
        let values = await https.fetchPost(this.baseUrl + "/ifs/attach/delete/" + attach_id)
        return values.data || {};
    },

    /**
     * 删除一个对象ID关联的所有附件记录
     * @param object_name   对象名称
     * @param object_keyid  对象记录ID
     * @returns {Promise<*|{}>}
     */
    deleteObjectAttach: async function(object_name, object_keyid){
        let values = await https.fetchPost(this.baseUrl + "/ifs/attach/deleteObjectAttach", {
            object_name,
            object_keyid
        })
        return values.data || {};
    },
}

export default attachApi