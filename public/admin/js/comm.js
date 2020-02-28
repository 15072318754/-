  
        function serializeToJson(form){
            var result={}
            // 获取表单用户输入的内容
            var f=form.serializeArray()
            // 把数组转对象
            f.forEach(item => { 
                result[item.name]= item.value
            });
            return result
        }