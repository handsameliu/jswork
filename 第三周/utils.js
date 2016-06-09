/**
 * Created by lucky on 2016/6/8.
 */
var utils = {
    //��������ת��������
    listToArray : function (likeArray){
        try{
            return Array.prototype.slice.call(likeArray,0);
        }catch(e){
            var a = [];
            for(var i=0; i<likeArray.length; i++){
                a[a.length] = likeArray[i];
            }
            return a;
        }
    },
    //����json�ַ���
    jsonParse : function (jsonStr){
        if('JSON' in window){
            return JSON.parse(jsonStr);
        }else{
            return eval('('+jsonStr+')');
        }
    },
    //offset��ȡele��body��ƫ����
    offset : function (ele){
        var offsetParent = ele.offsetParent;
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t +=  ele.offsetTop;
        while(offsetParent){
            l += offsetParent.clientLeft + offsetParent.offsetLeft;
            t +=  offsetParent.clientTop + offsetParent.offsetTop;
            offsetParent = offsetParent.offsetParent;
        }
        return {left:l,top:t};
    },
    //��ȡ���Ӵ�����ص�
    win : function (attr,val){
        if(typeof val != 'undefined'){ //˵���ڶ���������,��ô�����������ֵ��ֻ��һ�����������  scrollTop  scrollLeft
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    },
    //��ȡԪ�ؾ����������Ⱦ֮�����ʽ
    getCss : function (ele,attr){
        var val = null;
        if('getComputedStyle' in window){ //��׼�����
            val = window.getComputedStyle(ele,null)[attr];
        }else{ //ie678
            //����opacity���⣬ֻ�еͰ汾��ie�Ż����͸������filter��д
            if(attr === 'opacity'){
                val = ele.currentStyle['filter'];
                // alpha(opacity=70.55)
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/; //����ǰ���?:���һ��ʹ�þ���ƥ�䵫���Ҳ��������������Ż�
               /* val = reg.test(val) ?  reg.exec(val)[1]/100 : 1;*/
                if(reg.test(val)){
                    val = reg.exec(val)[1]/100;
                }else{ //˵�������û���ù�͸���ȣ����û������͸����Ĭ����1
                    val = 1;
                }

            }else{
                val = ele.currentStyle[attr];
            }

        }
        //��Ҫ����λ���� -33px  33.33px
        var regDanwei = /^-?\d+(\.\d+)?(px|pt|em|rem|deg)$/;
        val = regDanwei.test(val) ? parseFloat(val) : val;
        return val;
    },
    setCss : function (ele,attr,val){ //��ele����attr�����ʽֵ��val
        //���ָ������ж� opacity��Ҫ����,�ڱ�׼��ie�в�һ��
        if(attr == 'opacity'){
            var userAgent = window.navigator.userAgent; //
            var reg = /MSIE (7|8)/; //���������жϵ�ǰ�������ie7/8
            if(reg.test(userAgent)){ //�����������������ie7/8
                ele['style']['filter'] = 'alpha(opacity=' + val*100 + ')';
            }
            return;
        }
        if(attr == 'float'){ //float��ie�ͱ�׼��Ҳ����ͬ
            ele['style']['cssFloat'] = val; //��׼����������ø���
            ele['style']['styleFloat']=val; //ie�Ͱ汾���ø���
            return;
        }
        //windth height left top bottom right  margin padding marginBottom paddingRight...���Ƕ���Ҫ���ϵ�λ
        //5  5px  setCss(outer,width,5px)  ����λ���⣬�������λ�Ͳ��ô�����
        var reg = /^width|height|left|top|bottom|right|(margin|padding)(Left|Bottom|Right|Top)?$/; //�����Left Bottom Right Top���Գ��ֿ��Բ�����
        if(reg.test(attr)){ //������������֤ͨ��˵�������þ���������Щ���
            if(!isNaN(val)){ //����ж���val�Ƿ���˵�λ,������˵�λ�ҾͲ���px�� 5px 6px
                val += 'px';
            }
        }
        ele['style'][attr] = val; //�������Ǹ�ֵ����
    }
};
