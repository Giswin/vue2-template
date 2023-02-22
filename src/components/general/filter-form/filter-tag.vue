<template>
    <div style="margin-bottom: 8px; clear: both;">
        <el-tag v-for="(tag, index) in tags" :key="tag.key" closable
            @close="removeCondition(index)" size="small" style="margin-right: 5px;">
            {{tag.title}}: <span style="color: blue;">{{ show(tag)}}</span>
        </el-tag>
    </div>
</template>

<script>
    export default {
        name: "FilterTag",
        props:{
            // 已选择的条件项标签
            tags:{
                type: Array,
                default:()=>{
                    return [{
                        key: '',   // 标签key
                        field: '', // 字段名称
                        title: '', // 字段中文名称
                        value: '', // 字段值
                        label: ''  // 字段显示值(可选)
                    }]
                }
            } 
        },
        methods: {
            removeCondition(index) {
                const tag = this.tags[index];
                this.tags.splice(index, 1);
                this.$emit("remove-tag", tag)
            },
            
            show(tag) {
                let visiableText = '';
                if (tag.value.start && tag.value.end){
                    visiableText = tag.value.start + ' ~ ' + tag.value.end;
                }else if (tag.value.start){
                    visiableText = tag.value.start + ' ~ ';
                }else if (tag.value.end){
                    visiableText =  ' ~ ' + tag.value.end;
                }else{
                    let value = tag.label || tag.value;
                    // 多选
                    if( Array.isArray(value)){
                        visiableText = value.join("、")
                    }
                    // 单选
                    else{
                        visiableText = value
                    }
                }
                return visiableText
            }
        }
    }
</script>
