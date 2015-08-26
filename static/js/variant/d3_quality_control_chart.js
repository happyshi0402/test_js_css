/**
 * Created by lsl on 2015/8/17.
 */
var currentChromosomeIndex=0;//记录是第几个染色体的数据
var currentGeneIndex=0;//记录是第几个基因的数据
var RingFatherID="DoubleRing_div";
var BarFatherID="Bar_div";
var centerX=350;
var centerY=350;
var dataSet=[];
var centerText=[];
//var centerText=["50k区域", "130基因", "256靶向分段"];
//发送数据请求
sample_no1 = $("#variant_hid_sample_no").val();
var  project_no = $("#variant_hid_project_no").val();

$.ajax({
    url: "/variant/quality/",
    method: "POST",
    data:{"sample_no":sample_no1,"project_no":project_no},
    success:function(data){
        if(data.status==001){
            //画双环
            dataSet=data.data;
            centerText=[data.areas,data.genes,data.target];
            if(dataSet.length)
                draw(centerText,RingFatherID,700,700,centerX,centerY,dataSet,100,170,180,225);
        }else{
            swal(data.message);
        }
    },
    error:function(xhr){
        alert(xhr.status + xhr.statusText);
        swal("http request fail");
    }
});


/*示范数据2
 var data={"areas":"50k区域","genes":"130基因","target":"256靶向分段","status": 1, "message": "get success", "data": [{"length": 248956422, "genes": [{"regions": [{"width": 1160, "name": "KCNJ10", "height": 1325}], "length": 1, "name": "KCNJ10"}, {"regions": [{"width": 126, "name": "KIF1B", "height": 237}, {"width": 97, "name": "KIF1B", "height": 140}, {"width": 200, "name": "KIF1B", "height": 231}, {"width": 86, "name": "KIF1B", "height": 202}, {"width": 199, "name": "KIF1B", "height": 234}, {"width": 132, "name": "KIF1B", "height": 234}, {"width": 98, "name": "KIF1B", "height": 196}, {"width": 86, "name": "KIF1B", "height": 215}, {"width": 28, "name": "KIF1B", "height": 172}, {"width": 38, "name": "KIF1B", "height": 156}, {"width": 30, "name": "KIF1B", "height": 48}, {"width": 96, "name": "KIF1B", "height": 195}, {"width": 99, "name": "KIF1B", "height": 215}, {"width": 163, "name": "KIF1B", "height": 230}, {"width": 62, "name": "KIF1B", "height": 174}, {"width": 232, "name": "KIF1B", "height": 286}, {"width": 100, "name": "KIF1B", "height": 195}, {"width": 96, "name": "KIF1B", "height": 221}, {"width": 100, "name": "KIF1B", "height": 203}, {"width": 127, "name": "KIF1B", "height": 238}, {"width": 104, "name": "KIF1B", "height": 172}, {"width": 201, "name": "KIF1B", "height": 316}, {"width": 93, "name": "KIF1B", "height": 227}, {"width": 1505, "name": "KIF1B", "height": 1508}, {"width": 114, "name": "KIF1B", "height": 156}, {"width": 169, "name": "KIF1B", "height": 254}, {"width": 199, "name": "KIF1B", "height": 231}, {"width": 158, "name": "KIF1B", "height": 269}, {"width": 269, "name": "KIF1B", "height": 356}, {"width": 139, "name": "KIF1B", "height": 292}, {"width": 106, "name": "KIF1B", "height": 147}, {"width": 150, "name": "KIF1B", "height": 234}, {"width": 183, "name": "KIF1B", "height": 251}, {"width": 111, "name": "KIF1B", "height": 197}, {"width": 139, "name": "KIF1B", "height": 235}, {"width": 76, "name": "KIF1B", "height": 146}, {"width": 129, "name": "KIF1B", "height": 231}, {"width": 87, "name": "KIF1B", "height": 211}, {"width": 105, "name": "KIF1B", "height": 219}, {"width": 126, "name": "KIF1B", "height": 198}, {"width": 135, "name": "KIF1B", "height": 201}, {"width": 154, "name": "KIF1B", "height": 284}, {"width": 82, "name": "KIF1B", "height": 170}, {"width": 166, "name": "KIF1B", "height": 216}, {"width": 260, "name": "KIF1B", "height": 246}, {"width": 92, "name": "KIF1B", "height": 156}, {"width": 142, "name": "KIF1B", "height": 199}, {"width": 170, "name": "KIF1B", "height": 203}, {"width": 213, "name": "KIF1B", "height": 255}, {"width": 139, "name": "KIF1B", "height": 214}, {"width": 63, "name": "KIF1B", "height": 112}, {"width": 84, "name": "KIF1B", "height": 93}], "length": 52, "name": "KIF1B"}, {"regions": [{"width": 98, "name": "SDHB", "height": 139}, {"width": 143, "name": "SDHB", "height": 179}, {"width": 122, "name": "SDHB", "height": 157}, {"width": 137, "name": "SDHB", "height": 181}, {"width": 157, "name": "SDHB", "height": 235}, {"width": 106, "name": "SDHB", "height": 133}, {"width": 148, "name": "SDHB", "height": 219}, {"width": 92, "name": "SDHB", "height": 53}], "length": 8, "name": "SDHB"}, {"regions": [{"width": 209, "name": "AGT", "height": 263}, {"width": 165, "name": "AGT", "height": 224}, {"width": 288, "name": "AGT", "height": 238}, {"width": 876, "name": "AGT", "height": 827}], "length": 4, "name": "AGT"}, {"regions": [{"width": 197, "name": "BSND", "height": 222}, {"width": 115, "name": "BSND", "height": 220}, {"width": 296, "name": "BSND", "height": 227}, {"width": 435, "name": "BSND", "height": 424}], "length": 4, "name": "BSND"}, {"regions": [{"width": 182, "name": "REN", "height": 246}, {"width": 119, "name": "REN", "height": 204}, {"width": 162, "name": "REN", "height": 162}, {"width": 140, "name": "REN", "height": 232}, {"width": 29, "name": "REN", "height": 132}, {"width": 29, "name": "REN", "height": 127}, {"width": 217, "name": "REN", "height": 296}, {"width": 139, "name": "REN", "height": 229}, {"width": 144, "name": "REN", "height": 251}, {"width": 171, "name": "REN", "height": 282}, {"width": 118, "name": "REN", "height": 170}], "length": 11, "name": "REN"}, {"regions": [{"width": 120, "name": "CLCNKA", "height": 195}, {"width": 149, "name": "CLCNKA", "height": 143}, {"width": 149, "name": "CLCNKA", "height": 180}, {"width": 160, "name": "CLCNKA", "height": 164}, {"width": 98, "name": "CLCNKA", "height": 235}, {"width": 99, "name": "CLCNKA", "height": 199}, {"width": 146, "name": "CLCNKA", "height": 195}, {"width": 105, "name": "CLCNKA", "height": 195}, {"width": 122, "name": "CLCNKA", "height": 214}, {"width": 105, "name": "CLCNKA", "height": 139}, {"width": 194, "name": "CLCNKA", "height": 241}, {"width": 90, "name": "CLCNKA", "height": 157}, {"width": 131, "name": "CLCNKA", "height": 157}, {"width": 234, "name": "CLCNKA", "height": 252}, {"width": 154, "name": "CLCNKA", "height": 173}, {"width": 109, "name": "CLCNKA", "height": 85}, {"width": 104, "name": "CLCNKA", "height": 136}, {"width": 107, "name": "CLCNKA", "height": 156}, {"width": 68, "name": "CLCNKA", "height": 107}], "length": 19, "name": "CLCNKA"}, {"regions": [{"width": 40, "name": "SDHC", "height": 110}, {"width": 77, "name": "SDHC", "height": 168}, {"width": 122, "name": "SDHC", "height": 236}, {"width": 45, "name": "SDHC", "height": 105}, {"width": 82, "name": "SDHC", "height": 177}, {"width": 184, "name": "SDHC", "height": 274}, {"width": 232, "name": "SDHC", "height": 318}], "length": 7, "name": "SDHC"}, {"regions": [{"width": 120, "name": "CLCNKB", "height": 164}, {"width": 149, "name": "CLCNKB", "height": 168}, {"width": 149, "name": "CLCNKB", "height": 198}, {"width": 160, "name": "CLCNKB", "height": 221}, {"width": 98, "name": "CLCNKB", "height": 248}, {"width": 99, "name": "CLCNKB", "height": 210}, {"width": 294, "name": "CLCNKB", "height": 251}, {"width": 105, "name": "CLCNKB", "height": 172}, {"width": 122, "name": "CLCNKB", "height": 216}, {"width": 105, "name": "CLCNKB", "height": 154}, {"width": 194, "name": "CLCNKB", "height": 231}, {"width": 90, "name": "CLCNKB", "height": 157}, {"width": 131, "name": "CLCNKB", "height": 222}, {"width": 234, "name": "CLCNKB", "height": 258}, {"width": 154, "name": "CLCNKB", "height": 178}, {"width": 109, "name": "CLCNKB", "height": 111}, {"width": 104, "name": "CLCNKB", "height": 147}, {"width": 107, "name": "CLCNKB", "height": 135}, {"width": 68, "name": "CLCNKB", "height": 77}, {"width": 119, "name": "CLCNKB", "height": 254}], "length": 20, "name": "CLCNKB"}], "name": "1"}, {"length": 242193529, "genes": [{"regions": [{"width": 328, "name": "TMEM127", "height": 353}, {"width": 185, "name": "TMEM127", "height": 202}, {"width": 264, "name": "TMEM127", "height": 106}], "length": 3, "name": "TMEM127"}, {"regions": [{"width": 152, "name": "CUL3", "height": 195}, {"width": 166, "name": "CUL3", "height": 255}, {"width": 207, "name": "CUL3", "height": 253}, {"width": 155, "name": "CUL3", "height": 227}, {"width": 117, "name": "CUL3", "height": 182}, {"width": 145, "name": "CUL3", "height": 259}, {"width": 128, "name": "CUL3", "height": 242}, {"width": 191, "name": "CUL3", "height": 189}, {"width": 197, "name": "CUL3", "height": 227}, {"width": 166, "name": "CUL3", "height": 238}, {"width": 249, "name": "CUL3", "height": 335}, {"width": 135, "name": "CUL3", "height": 187}, {"width": 181, "name": "CUL3", "height": 223}, {"width": 134, "name": "CUL3", "height": 225}, {"width": 218, "name": "CUL3", "height": 228}, {"width": 147, "name": "CUL3", "height": 201}, {"width": 68, "name": "CUL3", "height": 0}, {"width": 104, "name": "CUL3", "height": 154}, {"width": 86, "name": "CUL3", "height": 92}], "length": 19, "name": "CUL3"}], "name": "2"}, {"length": 198295559, "genes": [{"regions": [{"width": 360, "name": "VHL", "height": 125}, {"width": 143, "name": "VHL", "height": 206}, {"width": 199, "name": "VHL", "height": 222}], "length": 3, "name": "VHL"}, {"regions": [{"width": 78, "name": "AGTR1", "height": 139}, {"width": 60, "name": "AGTR1", "height": 154}, {"width": 1147, "name": "AGTR1", "height": 1233}], "length": 3, "name": "AGTR1"}, {"regions": [{"width": 205, "name": "CASR", "height": 340}, {"width": 327, "name": "CASR", "height": 360}, {"width": 905, "name": "CASR", "height": 977}, {"width": 251, "name": "CASR", "height": 315}, {"width": 174, "name": "CASR", "height": 255}, {"width": 1525, "name": "CASR", "height": 1564}], "length": 6, "name": "CASR"}, {"regions": [{"width": 87, "name": "CACNA1D", "height": 119}, {"width": 330, "name": "CACNA1D", "height": 450}, {"width": 126, "name": "CACNA1D", "height": 279}, {"width": 160, "name": "CACNA1D", "height": 289}, {"width": 163, "name": "CACNA1D", "height": 282}, {"width": 173, "name": "CACNA1D", "height": 250}, {"width": 217, "name": "CACNA1D", "height": 259}, {"width": 124, "name": "CACNA1D", "height": 280}, {"width": 124, "name": "CACNA1D", "height": 249}, {"width": 190, "name": "CACNA1D", "height": 265}, {"width": 104, "name": "CACNA1D", "height": 199}, {"width": 108, "name": "CACNA1D", "height": 135}, {"width": 80, "name": "CACNA1D", "height": 116}, {"width": 47, "name": "CACNA1D", "height": 176}, {"width": 181, "name": "CACNA1D", "height": 271}, {"width": 246, "name": "CACNA1D", "height": 368}, {"width": 228, "name": "CACNA1D", "height": 265}, {"width": 141, "name": "CACNA1D", "height": 311}, {"width": 135, "name": "CACNA1D", "height": 244}, {"width": 90, "name": "CACNA1D", "height": 124}, {"width": 87, "name": "CACNA1D", "height": 178}, {"width": 168, "name": "CACNA1D", "height": 331}, {"width": 150, "name": "CACNA1D", "height": 211}, {"width": 80, "name": "CACNA1D", "height": 162}, {"width": 127, "name": "CACNA1D", "height": 274}, {"width": 108, "name": "CACNA1D", "height": 178}, {"width": 128, "name": "CACNA1D", "height": 221}, {"width": 73, "name": "CACNA1D", "height": 232}, {"width": 167, "name": "CACNA1D", "height": 272}, {"width": 55, "name": "CACNA1D", "height": 146}, {"width": 222, "name": "CACNA1D", "height": 311}, {"width": 179, "name": "CACNA1D", "height": 195}, {"width": 131, "name": "CACNA1D", "height": 209}, {"width": 104, "name": "CACNA1D", "height": 159}, {"width": 104, "name": "CACNA1D", "height": 237}, {"width": 65, "name": "CACNA1D", "height": 162}, {"width": 149, "name": "CACNA1D", "height": 289}, {"width": 86, "name": "CACNA1D", "height": 155}, {"width": 112, "name": "CACNA1D", "height": 235}, {"width": 180, "name": "CACNA1D", "height": 291}, {"width": 148, "name": "CACNA1D", "height": 250}, {"width": 117, "name": "CACNA1D", "height": 263}, {"width": 123, "name": "CACNA1D", "height": 243}, {"width": 122, "name": "CACNA1D", "height": 212}, {"width": 151, "name": "CACNA1D", "height": 188}, {"width": 41, "name": "CACNA1D", "height": 147}, {"width": 80, "name": "CACNA1D", "height": 171}, {"width": 137, "name": "CACNA1D", "height": 215}, {"width": 388, "name": "CACNA1D", "height": 403}, {"width": 47, "name": "CACNA1D", "height": 157}, {"width": 170, "name": "CACNA1D", "height": 272}, {"width": 184, "name": "CACNA1D", "height": 284}, {"width": 142, "name": "CACNA1D", "height": 253}, {"width": 357, "name": "CACNA1D", "height": 369}, {"width": 314, "name": "CACNA1D", "height": 341}], "length": 55, "name": "CACNA1D"}, {"regions": [{"width": 102, "name": "PPARG", "height": 250}, {"width": 61, "name": "PPARG", "height": 106}, {"width": 36, "name": "PPARG", "height": 130}, {"width": 248, "name": "PPARG", "height": 297}, {"width": 191, "name": "PPARG", "height": 245}, {"width": 159, "name": "PPARG", "height": 248}, {"width": 46, "name": "PPARG", "height": 124}, {"width": 220, "name": "PPARG", "height": 235}, {"width": 471, "name": "PPARG", "height": 509}, {"width": 268, "name": "PPARG", "height": 242}], "length": 10, "name": "PPARG"}], "name": "3"}, {"length": 190214555, "genes": [{"regions": [{"width": 137, "name": "NR3C2", "height": 147}, {"width": 176, "name": "NR3C2", "height": 290}, {"width": 178, "name": "NR3C2", "height": 207}, {"width": 151, "name": "NR3C2", "height": 184}, {"width": 165, "name": "NR3C2", "height": 183}, {"width": 371, "name": "NR3C2", "height": 280}, {"width": 137, "name": "NR3C2", "height": 213}, {"width": 172, "name": "NR3C2", "height": 188}, {"width": 1777, "name": "NR3C2", "height": 1838}], "length": 9, "name": "NR3C2"}], "name": "4"}, {"length": 181538259, "genes": [{"regions": [{"width": 83, "name": "SDHA", "height": 37}, {"width": 118, "name": "SDHA", "height": 193}, {"width": 107, "name": "SDHA", "height": 147}, {"width": 182, "name": "SDHA", "height": 222}, {"width": 164, "name": "SDHA", "height": 193}, {"width": 185, "name": "SDHA", "height": 210}, {"width": 169, "name": "SDHA", "height": 228}, {"width": 145, "name": "SDHA", "height": 152}, {"width": 189, "name": "SDHA", "height": 259}, {"width": 216, "name": "SDHA", "height": 162}, {"width": 192, "name": "SDHA", "height": 184}, {"width": 139, "name": "SDHA", "height": 157}, {"width": 132, "name": "SDHA", "height": 199}, {"width": 152, "name": "SDHA", "height": 185}, {"width": 169, "name": "SDHA", "height": 145}, {"width": 107, "name": "SDHA", "height": 259}], "length": 16, "name": "SDHA"}, {"regions": [{"width": 68, "name": "NR3C1", "height": 188}, {"width": 173, "name": "NR3C1", "height": 257}, {"width": 181, "name": "NR3C1", "height": 236}, {"width": 159, "name": "NR3C1", "height": 274}, {"width": 165, "name": "NR3C1", "height": 233}, {"width": 299, "name": "NR3C1", "height": 334}, {"width": 137, "name": "NR3C1", "height": 243}, {"width": 190, "name": "NR3C1", "height": 252}, {"width": 1204, "name": "NR3C1", "height": 1194}], "length": 9, "name": "NR3C1"}, {"regions": [{"width": 505, "name": "GDNF", "height": 513}, {"width": 197, "name": "GDNF", "height": 211}, {"width": 45, "name": "GDNF", "height": 106}], "length": 3, "name": "GDNF"}, {"regions": [{"width": 49, "name": "KLHL3", "height": 102}, {"width": 164, "name": "KLHL3", "height": 153}, {"width": 161, "name": "KLHL3", "height": 223}, {"width": 149, "name": "KLHL3", "height": 167}, {"width": 122, "name": "KLHL3", "height": 157}, {"width": 218, "name": "KLHL3", "height": 202}, {"width": 138, "name": "KLHL3", "height": 187}, {"width": 23, "name": "KLHL3", "height": 0}, {"width": 170, "name": "KLHL3", "height": 195}, {"width": 137, "name": "KLHL3", "height": 197}, {"width": 130, "name": "KLHL3", "height": 220}, {"width": 183, "name": "KLHL3", "height": 155}, {"width": 142, "name": "KLHL3", "height": 202}, {"width": 55, "name": "KLHL3", "height": 89}, {"width": 127, "name": "KLHL3", "height": 204}, {"width": 140, "name": "KLHL3", "height": 216}, {"width": 34, "name": "KLHL3", "height": 117}], "length": 17, "name": "KLHL3"}], "name": "5"}, {"length": 170805979, "genes": [{"regions": [{"width": 222, "name": "CYP21A2", "height": 262}, {"width": 110, "name": "CYP21A2", "height": 156}, {"width": 167, "name": "CYP21A2", "height": 180}, {"width": 122, "name": "CYP21A2", "height": 164}, {"width": 122, "name": "CYP21A2", "height": 211}, {"width": 107, "name": "CYP21A2", "height": 172}, {"width": 222, "name": "CYP21A2", "height": 161}, {"width": 199, "name": "CYP21A2", "height": 165}, {"width": 124, "name": "CYP21A2", "height": 69}, {"width": 286, "name": "CYP21A2", "height": 163}, {"width": 222, "name": "CYP21A2", "height": 235}, {"width": 110, "name": "CYP21A2", "height": 176}, {"width": 208, "name": "CYP21A2", "height": 161}, {"width": 122, "name": "CYP21A2", "height": 195}, {"width": 122, "name": "CYP21A2", "height": 227}, {"width": 107, "name": "CYP21A2", "height": 198}, {"width": 221, "name": "CYP21A2", "height": 233}, {"width": 199, "name": "CYP21A2", "height": 366}, {"width": 124, "name": "CYP21A2", "height": 318}, {"width": 286, "name": "CYP21A2", "height": 271}], "length": 20, "name": "CYP21A2"}], "name": "6"}, {"length": 159345973, "genes": [], "name": "7"}, {"length": 145138636, "genes": [{"regions": [{"width": 134, "name": "CYP11B1", "height": 196}, {"width": 218, "name": "CYP11B1", "height": 229}, {"width": 168, "name": "CYP11B1", "height": 244}, {"width": 187, "name": "CYP11B1", "height": 118}, {"width": 175, "name": "CYP11B1", "height": 144}, {"width": 224, "name": "CYP11B1", "height": 108}, {"width": 220, "name": "CYP11B1", "height": 142}, {"width": 98, "name": "CYP11B1", "height": 173}, {"width": 176, "name": "CYP11B1", "height": 147}, {"width": 155, "name": "CYP11B1", "height": 136}, {"width": 259, "name": "CYP11B1", "height": 218}], "length": 11, "name": "CYP11B1"}], "name": "8"}, {"length": 138394717, "genes": [], "name": "9"}, {"length": 133797422, "genes": [{"regions": [{"width": 304, "name": "CYP17A1", "height": 239}, {"width": 124, "name": "CYP17A1", "height": 149}, {"width": 190, "name": "CYP17A1", "height": 173}, {"width": 236, "name": "CYP17A1", "height": 258}, {"width": 107, "name": "CYP17A1", "height": 213}, {"width": 250, "name": "CYP17A1", "height": 349}, {"width": 159, "name": "CYP17A1", "height": 190}, {"width": 317, "name": "CYP17A1", "height": 307}], "length": 8, "name": "CYP17A1"}, {"regions": [{"width": 93, "name": "RET", "height": 0}, {"width": 284, "name": "RET", "height": 122}, {"width": 308, "name": "RET", "height": 288}, {"width": 262, "name": "RET", "height": 134}, {"width": 216, "name": "RET", "height": 119}, {"width": 220, "name": "RET", "height": 182}, {"width": 279, "name": "RET", "height": 165}, {"width": 146, "name": "RET", "height": 133}, {"width": 131, "name": "RET", "height": 191}, {"width": 140, "name": "RET", "height": 117}, {"width": 277, "name": "RET", "height": 196}, {"width": 168, "name": "RET", "height": 237}, {"width": 128, "name": "RET", "height": 166}, {"width": 235, "name": "RET", "height": 89}, {"width": 143, "name": "RET", "height": 148}, {"width": 91, "name": "RET", "height": 147}, {"width": 158, "name": "RET", "height": 145}, {"width": 120, "name": "RET", "height": 185}, {"width": 200, "name": "RET", "height": 201}, {"width": 178, "name": "RET", "height": 222}], "length": 20, "name": "RET"}], "name": "10"}, {"length": 135086622, "genes": [{"regions": [{"width": 56, "name": "SDHAF2", "height": 155}, {"width": 244, "name": "SDHAF2", "height": 349}, {"width": 130, "name": "SDHAF2", "height": 257}, {"width": 151, "name": "SDHAF2", "height": 243}], "length": 4, "name": "SDHAF2"}, {"regions": [{"width": 957, "name": "KCNJ5", "height": 947}, {"width": 343, "name": "KCNJ5", "height": 303}], "length": 2, "name": "KCNJ5"}, {"regions": [{"width": 218, "name": "CCND1", "height": 174}, {"width": 236, "name": "CCND1", "height": 83}, {"width": 180, "name": "CCND1", "height": 142}, {"width": 169, "name": "CCND1", "height": 77}, {"width": 185, "name": "CCND1", "height": 155}], "length": 5, "name": "CCND1"}, {"regions": [{"width": 1160, "name": "KCNJ1", "height": 1271}, {"width": 56, "name": "KCNJ1", "height": 170}, {"width": 50, "name": "KCNJ1", "height": 163}], "length": 3, "name": "KCNJ1"}, {"regions": [{"width": 503, "name": "MEN1", "height": 374}, {"width": 185, "name": "MEN1", "height": 119}, {"width": 156, "name": "MEN1", "height": 127}, {"width": 157, "name": "MEN1", "height": 131}, {"width": 108, "name": "MEN1", "height": 72}, {"width": 61, "name": "MEN1", "height": 113}, {"width": 149, "name": "MEN1", "height": 122}, {"width": 229, "name": "MEN1", "height": 213}, {"width": 480, "name": "MEN1", "height": 372}], "length": 9, "name": "MEN1"}, {"regions": [{"width": 72, "name": "SDHD", "height": 102}, {"width": 137, "name": "SDHD", "height": 207}, {"width": 165, "name": "SDHD", "height": 256}, {"width": 138, "name": "SDHD", "height": 0}, {"width": 186, "name": "SDHD", "height": 318}, {"width": 21, "name": "SDHD", "height": 12}], "length": 6, "name": "SDHD"}], "name": "11"}, {"length": 133275309, "genes": [{"regions": [{"width": 779, "name": "WNK1", "height": 584}, {"width": 193, "name": "WNK1", "height": 246}, {"width": 270, "name": "WNK1", "height": 254}, {"width": 178, "name": "WNK1", "height": 223}, {"width": 110, "name": "WNK1", "height": 163}, {"width": 109, "name": "WNK1", "height": 237}, {"width": 240, "name": "WNK1", "height": 325}, {"width": 351, "name": "WNK1", "height": 406}, {"width": 208, "name": "WNK1", "height": 253}, {"width": 275, "name": "WNK1", "height": 361}, {"width": 1259, "name": "WNK1", "height": 1286}, {"width": 104, "name": "WNK1", "height": 193}, {"width": 170, "name": "WNK1", "height": 268}, {"width": 479, "name": "WNK1", "height": 461}, {"width": 299, "name": "WNK1", "height": 290}, {"width": 118, "name": "WNK1", "height": 186}, {"width": 183, "name": "WNK1", "height": 218}, {"width": 137, "name": "WNK1", "height": 206}, {"width": 194, "name": "WNK1", "height": 328}, {"width": 78, "name": "WNK1", "height": 170}, {"width": 143, "name": "WNK1", "height": 241}, {"width": 1456, "name": "WNK1", "height": 1406}, {"width": 104, "name": "WNK1", "height": 181}, {"width": 104, "name": "WNK1", "height": 191}, {"width": 81, "name": "WNK1", "height": 198}, {"width": 94, "name": "WNK1", "height": 151}, {"width": 682, "name": "WNK1", "height": 628}, {"width": 223, "name": "WNK1", "height": 284}, {"width": 215, "name": "WNK1", "height": 219}, {"width": 208, "name": "WNK1", "height": 242}, {"width": 338, "name": "WNK1", "height": 306}], "length": 31, "name": "WNK1"}, {"regions": [{"width": 401, "name": "SCNN1A", "height": 202}, {"width": 96, "name": "SCNN1A", "height": 205}, {"width": 76, "name": "SCNN1A", "height": 222}, {"width": 78, "name": "SCNN1A", "height": 125}, {"width": 99, "name": "SCNN1A", "height": 148}, {"width": 86, "name": "SCNN1A", "height": 0}, {"width": 138, "name": "SCNN1A", "height": 111}, {"width": 119, "name": "SCNN1A", "height": 171}, {"width": 184, "name": "SCNN1A", "height": 159}, {"width": 124, "name": "SCNN1A", "height": 228}, {"width": 211, "name": "SCNN1A", "height": 173}, {"width": 288, "name": "SCNN1A", "height": 152}, {"width": 613, "name": "SCNN1A", "height": 482}, {"width": 35, "name": "SCNN1A", "height": 119}], "length": 14, "name": "SCNN1A"}], "name": "12"}, {"length": 114364328, "genes": [], "name": "13"}, {"length": 107043718, "genes": [{"regions": [{"width": 101, "name": "MAX", "height": 190}, {"width": 208, "name": "MAX", "height": 162}, {"width": 37, "name": "MAX", "height": 173}, {"width": 254, "name": "MAX", "height": 224}, {"width": 140, "name": "MAX", "height": 159}, {"width": 128, "name": "MAX", "height": 194}, {"width": 106, "name": "MAX", "height": 82}, {"width": 56, "name": "MAX", "height": 82}], "length": 8, "name": "MAX"}], "name": "14"}, {"length": 101991189, "genes": [{"regions": [{"width": 440, "name": "SLC12A1", "height": 469}, {"width": 152, "name": "SLC12A1", "height": 277}, {"width": 96, "name": "SLC12A1", "height": 208}, {"width": 116, "name": "SLC12A1", "height": 232}, {"width": 116, "name": "SLC12A1", "height": 229}, {"width": 23, "name": "SLC12A1", "height": 78}, {"width": 160, "name": "SLC12A1", "height": 289}, {"width": 131, "name": "SLC12A1", "height": 226}, {"width": 132, "name": "SLC12A1", "height": 260}, {"width": 148, "name": "SLC12A1", "height": 273}, {"width": 98, "name": "SLC12A1", "height": 129}, {"width": 105, "name": "SLC12A1", "height": 214}, {"width": 172, "name": "SLC12A1", "height": 245}, {"width": 128, "name": "SLC12A1", "height": 201}, {"width": 144, "name": "SLC12A1", "height": 258}, {"width": 122, "name": "SLC12A1", "height": 238}, {"width": 176, "name": "SLC12A1", "height": 285}, {"width": 120, "name": "SLC12A1", "height": 278}, {"width": 132, "name": "SLC12A1", "height": 230}, {"width": 161, "name": "SLC12A1", "height": 282}, {"width": 127, "name": "SLC12A1", "height": 191}, {"width": 103, "name": "SLC12A1", "height": 173}, {"width": 164, "name": "SLC12A1", "height": 282}, {"width": 152, "name": "SLC12A1", "height": 259}, {"width": 132, "name": "SLC12A1", "height": 188}, {"width": 107, "name": "SLC12A1", "height": 148}, {"width": 156, "name": "SLC12A1", "height": 219}, {"width": 88, "name": "SLC12A1", "height": 195}, {"width": 156, "name": "SLC12A1", "height": 249}], "length": 29, "name": "SLC12A1"}], "name": "15"}, {"length": 90338345, "genes": [{"regions": [{"width": 337, "name": "SCNN1G", "height": 300}, {"width": 321, "name": "SCNN1G", "height": 354}, {"width": 211, "name": "SCNN1G", "height": 216}, {"width": 124, "name": "SCNN1G", "height": 160}, {"width": 184, "name": "SCNN1G", "height": 166}, {"width": 119, "name": "SCNN1G", "height": 141}, {"width": 138, "name": "SCNN1G", "height": 159}, {"width": 99, "name": "SCNN1G", "height": 216}, {"width": 78, "name": "SCNN1G", "height": 177}, {"width": 82, "name": "SCNN1G", "height": 99}, {"width": 96, "name": "SCNN1G", "height": 170}, {"width": 401, "name": "SCNN1G", "height": 384}], "length": 12, "name": "SCNN1G"}, {"regions": [{"width": 285, "name": "HSD11B2", "height": 4}, {"width": 233, "name": "HSD11B2", "height": 192}, {"width": 206, "name": "HSD11B2", "height": 167}, {"width": 158, "name": "HSD11B2", "height": 89}, {"width": 436, "name": "HSD11B2", "height": 384}], "length": 5, "name": "HSD11B2"}, {"regions": [{"width": 122, "name": "SCNN1B", "height": 122}, {"width": 45, "name": "SCNN1B", "height": 91}, {"width": 339, "name": "SCNN1B", "height": 258}, {"width": 294, "name": "SCNN1B", "height": 316}, {"width": 211, "name": "SCNN1B", "height": 251}, {"width": 124, "name": "SCNN1B", "height": 243}, {"width": 184, "name": "SCNN1B", "height": 100}, {"width": 128, "name": "SCNN1B", "height": 175}, {"width": 138, "name": "SCNN1B", "height": 154}, {"width": 96, "name": "SCNN1B", "height": 140}, {"width": 78, "name": "SCNN1B", "height": 175}, {"width": 82, "name": "SCNN1B", "height": 85}, {"width": 96, "name": "SCNN1B", "height": 153}, {"width": 401, "name": "SCNN1B", "height": 218}], "length": 14, "name": "SCNN1B"}, {"regions": [{"width": 302, "name": "SLC12A3", "height": 223}, {"width": 167, "name": "SLC12A3", "height": 193}, {"width": 96, "name": "SLC12A3", "height": 138}, {"width": 116, "name": "SLC12A3", "height": 187}, {"width": 160, "name": "SLC12A3", "height": 213}, {"width": 131, "name": "SLC12A3", "height": 197}, {"width": 132, "name": "SLC12A3", "height": 204}, {"width": 151, "name": "SLC12A3", "height": 232}, {"width": 105, "name": "SLC12A3", "height": 75}, {"width": 175, "name": "SLC12A3", "height": 207}, {"width": 128, "name": "SLC12A3", "height": 205}, {"width": 144, "name": "SLC12A3", "height": 157}, {"width": 122, "name": "SLC12A3", "height": 162}, {"width": 176, "name": "SLC12A3", "height": 227}, {"width": 120, "name": "SLC12A3", "height": 139}, {"width": 132, "name": "SLC12A3", "height": 231}, {"width": 161, "name": "SLC12A3", "height": 163}, {"width": 127, "name": "SLC12A3", "height": 150}, {"width": 103, "name": "SLC12A3", "height": 200}, {"width": 98, "name": "SLC12A3", "height": 136}, {"width": 122, "name": "SLC12A3", "height": 128}, {"width": 132, "name": "SLC12A3", "height": 249}, {"width": 107, "name": "SLC12A3", "height": 139}, {"width": 156, "name": "SLC12A3", "height": 203}, {"width": 88, "name": "SLC12A3", "height": 160}, {"width": 162, "name": "SLC12A3", "height": 246}], "length": 26, "name": "SLC12A3"}], "name": "16"}, {"length": 83257441, "genes": [{"regions": [{"width": 269, "name": "ACE", "height": 100}, {"width": 188, "name": "ACE", "height": 169}, {"width": 114, "name": "ACE", "height": 152}, {"width": 164, "name": "ACE", "height": 217}, {"width": 212, "name": "ACE", "height": 261}, {"width": 118, "name": "ACE", "height": 124}, {"width": 193, "name": "ACE", "height": 260}, {"width": 244, "name": "ACE", "height": 275}, {"width": 165, "name": "ACE", "height": 192}, {"width": 119, "name": "ACE", "height": 79}, {"width": 143, "name": "ACE", "height": 190}, {"width": 232, "name": "ACE", "height": 126}, {"width": 219, "name": "ACE", "height": 163}, {"width": 157, "name": "ACE", "height": 255}, {"width": 179, "name": "ACE", "height": 270}, {"width": 108, "name": "ACE", "height": 191}, {"width": 164, "name": "ACE", "height": 238}, {"width": 212, "name": "ACE", "height": 289}, {"width": 118, "name": "ACE", "height": 183}, {"width": 193, "name": "ACE", "height": 267}, {"width": 244, "name": "ACE", "height": 205}, {"width": 165, "name": "ACE", "height": 247}, {"width": 119, "name": "ACE", "height": 199}, {"width": 143, "name": "ACE", "height": 210}, {"width": 208, "name": "ACE", "height": 165}, {"width": 250, "name": "ACE", "height": 193}, {"width": 48, "name": "ACE", "height": 50}], "length": 27, "name": "ACE"}, {"regions": [{"width": 638, "name": "WNK4", "height": 338}, {"width": 193, "name": "WNK4", "height": 158}, {"width": 348, "name": "WNK4", "height": 307}, {"width": 178, "name": "WNK4", "height": 160}, {"width": 109, "name": "WNK4", "height": 160}, {"width": 237, "name": "WNK4", "height": 135}, {"width": 285, "name": "WNK4", "height": 217}, {"width": 142, "name": "WNK4", "height": 213}, {"width": 79, "name": "WNK4", "height": 151}, {"width": 138, "name": "WNK4", "height": 205}, {"width": 137, "name": "WNK4", "height": 217}, {"width": 299, "name": "WNK4", "height": 258}, {"width": 75, "name": "WNK4", "height": 106}, {"width": 631, "name": "WNK4", "height": 527}, {"width": 81, "name": "WNK4", "height": 154}, {"width": 440, "name": "WNK4", "height": 441}, {"width": 220, "name": "WNK4", "height": 188}, {"width": 118, "name": "WNK4", "height": 136}, {"width": 23, "name": "WNK4", "height": 118}], "length": 19, "name": "WNK4"}, {"regions": [{"width": 80, "name": "NF1", "height": 59}, {"width": 164, "name": "NF1", "height": 283}, {"width": 104, "name": "NF1", "height": 221}, {"width": 211, "name": "NF1", "height": 281}, {"width": 127, "name": "NF1", "height": 226}, {"width": 88, "name": "NF1", "height": 144}, {"width": 96, "name": "NF1", "height": 139}, {"width": 178, "name": "NF1", "height": 266}, {"width": 194, "name": "NF1", "height": 305}, {"width": 143, "name": "NF1", "height": 212}, {"width": 95, "name": "NF1", "height": 214}, {"width": 152, "name": "NF1", "height": 223}, {"width": 155, "name": "NF1", "height": 203}, {"width": 134, "name": "NF1", "height": 214}, {"width": 161, "name": "NF1", "height": 302}, {"width": 144, "name": "NF1", "height": 222}, {"width": 176, "name": "NF1", "height": 287}, {"width": 270, "name": "NF1", "height": 291}, {"width": 94, "name": "NF1", "height": 127}, {"width": 104, "name": "NF1", "height": 175}, {"width": 461, "name": "NF1", "height": 434}, {"width": 160, "name": "NF1", "height": 193}, {"width": 143, "name": "NF1", "height": 209}, {"width": 104, "name": "NF1", "height": 158}, {"width": 137, "name": "NF1", "height": 154}, {"width": 202, "name": "NF1", "height": 240}, {"width": 232, "name": "NF1", "height": 285}, {"width": 182, "name": "NF1", "height": 287}, {"width": 124, "name": "NF1", "height": 192}, {"width": 156, "name": "NF1", "height": 215}, {"width": 83, "name": "NF1", "height": 106}, {"width": 179, "name": "NF1", "height": 234}, {"width": 118, "name": "NF1", "height": 196}, {"width": 167, "name": "NF1", "height": 256}, {"width": 167, "name": "NF1", "height": 297}, {"width": 131, "name": "NF1", "height": 225}, {"width": 453, "name": "NF1", "height": 540}, {"width": 361, "name": "NF1", "height": 437}, {"width": 223, "name": "NF1", "height": 285}, {"width": 214, "name": "NF1", "height": 242}, {"width": 161, "name": "NF1", "height": 267}, {"width": 300, "name": "NF1", "height": 261}, {"width": 235, "name": "NF1", "height": 273}, {"width": 82, "name": "NF1", "height": 200}, {"width": 158, "name": "NF1", "height": 269}, {"width": 122, "name": "NF1", "height": 181}, {"width": 161, "name": "NF1", "height": 226}, {"width": 147, "name": "NF1", "height": 257}, {"width": 152, "name": "NF1", "height": 197}, {"width": 156, "name": "NF1", "height": 256}, {"width": 178, "name": "NF1", "height": 150}, {"width": 143, "name": "NF1", "height": 189}, {"width": 151, "name": "NF1", "height": 254}, {"width": 121, "name": "NF1", "height": 247}, {"width": 163, "name": "NF1", "height": 271}, {"width": 67, "name": "NF1", "height": 195}, {"width": 237, "name": "NF1", "height": 222}, {"width": 74, "name": "NF1", "height": 172}, {"width": 163, "name": "NF1", "height": 245}, {"width": 64, "name": "NF1", "height": 133}], "length": 60, "name": "NF1"}], "name": "17"}, {"length": 80373285, "genes": [], "name": "18"}, {"length": 58617616, "genes": [], "name": "19"}, {"length": 64444167, "genes": [], "name": "20"}, {"length": 46709983, "genes": [], "name": "21"}, {"length": 50818468, "genes": [{"regions": [{"width": 134, "name": "NF2", "height": 202}, {"width": 146, "name": "NF2", "height": 188}, {"width": 143, "name": "NF2", "height": 218}, {"width": 104, "name": "NF2", "height": 208}, {"width": 89, "name": "NF2", "height": 154}, {"width": 103, "name": "NF2", "height": 220}, {"width": 96, "name": "NF2", "height": 181}, {"width": 155, "name": "NF2", "height": 271}, {"width": 95, "name": "NF2", "height": 162}, {"width": 134, "name": "NF2", "height": 259}, {"width": 143, "name": "NF2", "height": 270}, {"width": 238, "name": "NF2", "height": 151}, {"width": 126, "name": "NF2", "height": 120}, {"width": 148, "name": "NF2", "height": 268}, {"width": 183, "name": "NF2", "height": 302}, {"width": 106, "name": "NF2", "height": 213}, {"width": 78, "name": "NF2", "height": 130}], "length": 17, "name": "NF2"}], "name": "22"}, {"length": 156040895, "genes": [], "name": "X"}, {"length": 57227415, "genes": [], "name": "Y"}, {"length": 16569, "genes": [], "name": "\u7ebf\u7c92\u4f53"}], "run_time": 0.012649};

 console.log(data);
 dataSet=data.data;
 console.log(dataSet);
 console.log(data.areas);
 console.log(data["areas"]);
 centerText=[data.areas,data.genes,data.target];
 console.log(centerText);
 draw(centerText,RingFatherID,width,height,centerX,centerY,dataSet,120,180,190,235);
 */

/*//画双环函数
 * RingFatherID:svg容器id
 * width：svg宽度
 * height：svg高度
 * centerX：svg中心相对于父容器原点的偏移X坐标
 * centerY：svg中心相对于父容器原点的偏移Y坐标
 * dataSet：双环数据
 * innerRadius1：内环内半径
 * outerRadius1：内环外半径
 * innerRadius2：外环内半径
 * outerRadius2：外环外半径
 * */
function draw(centerText,RingFatherID,width,height,centerX,centerY,dataSet,innerRadius1,outerRadius1,innerRadius2,outerRadius2){
    /***数据组装**/
    var dataSet1=[];//染色体
    var dataSet1Text=[];//染色体
    var dataSet2=[];//genes
    var dataSet2X=[];//genes
    var dataSet3Width=[];//exon
    var dataSet3Height=[];//exon
    for(var i=0;i<dataSet.length;i++){
        dataSet1.push(dataSet[i]["length"]);
        dataSet1Text.push(dataSet[i]["name"]);
        dataSet2.push([]);
        dataSet2X.push([]);
        dataSet3Width.push([]);
        dataSet3Height.push([]);
        for(var j=0;j<dataSet[i]["genes"].length;j++){
            dataSet2[i].push(dataSet[i]["genes"][j]["length"]);
            dataSet2X[i].push(dataSet[i]["genes"][j]["name"]);
            dataSet3Width[i].push([]);
            dataSet3Height[i].push([]);
            for(var k=0;k<dataSet[i]["genes"][j]["regions"].length;k++){
                dataSet3Width[i][j].push(dataSet[i]["genes"][j]["regions"][k]["width"]);
                dataSet3Height[i][j].push(dataSet[i]["genes"][j]["regions"][k]["height"]);
            }
        }
    }
    console.log(JSON.stringify(dataSet3Width));
    /*
     console.log("dataSet");
     console.log(dataSet);
     console.log("dataSet1");
     console.log(dataSet1);
     console.log("dataSet2");
     console.log(dataSet2);
     console.log("dataSet2X");
     console.log(dataSet2X);
     */
    /***数据组装**/

    //创建svg
    var svg = d3.select("#"+RingFatherID).append("svg")
        .attr("width",width)
        .attr("height",height);

    //渲染中心文字
    svg.selectAll("text")
        .data(centerText)
        .enter()
        .append("text")
        .attr("x", function(d,i){
            return centerX-8* d.length/2;
        } )
        .attr("y",function(d,i){
            return centerY-45+30*i;
        })
        .attr("dx",0)
        .attr("dy", 20)
        .attr("fill","black")
        .attr("font-size", 14)
        //.attr("font-family","FangSong_GB2312")
        .text(function(d,i){
            return d;
        });

    //初始化内环
    drawInnerRing(svg,centerX,centerY,innerRadius1,outerRadius1,dataSet1Text,dataSet1,dataSet2X,dataSet2,dataSet3Width,dataSet3Height,"arc1");


    //画内环函数
    function drawInnerRing(svgObject,centerX,centerY,innerRadius,outerRadius,dataSet1Text,dataSet1,dataSet2X,dataSet2,dataSet3Width,dataSet3Height,type){
        var pie = d3.layout.pie();
        //消除默认排序
        pie.sort(null);
        var color = d3.scale.category10();
        var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        svgObject.selectAll("g[type="+type+"]")
            .remove();
        var arcs1 = svgObject.selectAll("g[type="+type+"]")
            .remove()//此时没有 arc2 所以remove 后对生成的arc2 的个数无影响
            .data(pie(dataSet1))
            .enter()
            .append("g")
            .attr("transform","translate("+centerX+","+centerY+")")
            .attr("type",type)
        arcs1.append("path")
            .attr("fill",function(d,i){
                if(dataSet1Text[i]=="")
                    return d3.rgb(255,255,255);
                else
                    return color(i);
            })
            .attr("d",function(d,i){
                return arc(d);
            })
            .style({'stroke': 'white', 'stroke-width': 1})
            .style("cursor",function(d,i){
                if(dataSet1Text[i]!="")
                    return "pointer"
            })
            .on("click",function(d,i){
                if(dataSet1Text[i]!="")
                {
                    currentChromosomeIndex=i;
                    drawOuterRing(svg,centerX,centerY,innerRadius2,outerRadius2,dataSet2X[currentChromosomeIndex],dataSet2[currentChromosomeIndex],dataSet3Width,dataSet3Height,"arc2");
                }
            });
        arcs1.append("text")
            .attr("transform",function(d,i){
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor","middle")
            .text(function(d,i){
                return dataSet1Text[i];
            })
            .style("cursor",function(d,i){
                if(dataSet1Text[i]!="")
                    return "pointer"
            })
            .on("click",function(d,i){
                if(dataSet1Text[i]!=""){
                    currentChromosomeIndex=i;
                    drawOuterRing(svg,centerX,centerY,innerRadius2,outerRadius2,dataSet2X[currentChromosomeIndex],dataSet2[currentChromosomeIndex],dataSet3Width,dataSet3Height,"arc2");
                }
            });
    }
    //画外环函数
    function drawOuterRing(svgObject,centerX,centerY,innerRadius,outerRadius,dataSetX,dataSet,dataSet3Width,dataSet3Height,type){
        var pie = d3.layout.pie();
        //消除默认排序
        pie.sort(null);
        var color = d3.scale.category20c();
        var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        svgObject.selectAll("g[type="+type+"]")
            .remove();
        var arcs_refresh = svgObject.selectAll("g[type="+type+"]")
            // .remove()//此时没有 arc2 所以remove 后对生成的arc2 的个数无影响
            .data(pie(dataSet))
            .enter()
            .append("g")
            .attr("transform","translate("+centerX+","+centerY+")")
            .attr("type",type);
        arcs_refresh.append("path")
            .attr("fill",function(d,i){
                if(dataSetX[i]=="")
                    return d3.rgb(255,255,255);
                else
                    return color(i);
            })
            .attr("d",function(d,i){
                return arc(d);
            })
            .style({'stroke': 'white', 'stroke-width': 1})
            .style("cursor",function(d,i){
                if(dataSetX[i]!="")
                    return "pointer"
            })
            .on("click",function(d,i){
                if(dataSetX[i]!=""){
                    currentGeneIndex=i;
                    drawBar(BarFatherID,"name", dataSet3Width[currentChromosomeIndex][currentGeneIndex],dataSet3Height[currentChromosomeIndex][currentGeneIndex],700,700,currentChromosomeIndex);
                }
            });
        arcs_refresh.append("text")
            .attr("transform",function(d,i){
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor","middle")
            .text(function(d,i){
                return dataSetX[i];
            })
            .style("cursor",function(d,i){
                if(dataSetX[i]!="")
                    return "pointer"
            })
            .on("click",function(d,i){
                if(dataSetX[i]!=""){
                    currentGeneIndex=i;
                    drawBar(BarFatherID,"name",dataSet3Width[currentChromosomeIndex][currentGeneIndex],dataSet3Height[currentChromosomeIndex][currentGeneIndex],700,700,currentChromosomeIndex);
                }
            });
    }
    //画柱状图
    function drawBar(BarFatherID,name,dataSetX,dataSetY,barWidth,barHeight,id){
        console.log("柱状图");
        console.log(dataSetX);
        console.log(dataSetY);

        //数据过滤：去除掉name为空的无效数据
        var dataX=[];
        var dataY=[];
        for(var i=0;i<dataSetX.length;i++){
            if(dataSetX[i]!=""){
                dataX.push(dataSetX[i]);
                dataY.push(dataSetY[i]);
            }
        }


        d3.select("#"+BarFatherID).selectAll("svg").remove();
        var svg = d3.select("#"+BarFatherID)
            .append("svg")
            .attr("id",id)
            .attr("father",name)
            .attr("width",barWidth)
            .attr("height",barHeight);

        var xAxisScale = d3.scale.ordinal()//x轴数据
            .domain(d3.range(dataX.length))
            .rangeRoundBands([0,650]);

        var yAxisScale = d3.scale.linear()
            .domain([0,d3.max(dataY)])
            .range([500,0]);

        var xScale = d3.scale.ordinal()// 构造一个序数比例尺。x轴比例尺
            .domain(d3.range(dataX.length))
            .rangeRoundBands([0,650],0.1);

        var yScale = d3.scale.linear()// 构建一个线性定量比例尺。
            .domain([0,d3.max(dataY)])
            .range([0,500]);

        var xAxis = d3.svg.axis()
            .scale(xAxisScale)
            .orient("bottom");

        var yAxis = d3.svg.axis()// 创建一个axis生成器。
            .scale(yAxisScale)
            .orient("left");

        svg.selectAll("rect")
            .data(dataY)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return 40+ xScale(i);
            } )
            .attr("y",function(d,i){
                return 50 + 500 - yScale(d) ;
            })
            .attr("width", function(d,i){
                return xScale.rangeBand();
            })
            .attr("height",function(d,i){
                return yScale(d);
            })
            .attr("fill","green");
        /*    .on("click",function(d,i){
         d3.select(this)
         .attr("fill","green");
         })
         .on("mouseover",function(d,i){
         d3.select(this)
         .attr("fill","yellow");
         })
         .on("mouseout",function(d,i){
         d3.select(this)
         .transition()
         .duration(500)
         .attr("fill","steelblue");
         });
         */

        svg.selectAll("text")
            .data(dataY)
            .enter()
            .append("text")
            .attr("x", function(d,i){
                return 40 + xScale(i);
            } )
            .attr("y",function(d,i){
                return 50 + 500 - yScale(d) ;
            })
            .attr("dx", function(d,i){
                return xScale.rangeBand()/5;
            })
            .attr("dy", 15)
            .attr("font-size", 14)
            .attr("fill","white")
            .text(function(d,i){
                return d;
            });

        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(40,550)")
            .call(xAxis);

        svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(40,50)")
            .call(yAxis);
    }
}