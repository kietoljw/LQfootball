function showAllImage(randomId){
			var contentId = eval("contentId"+randomId);
			var uls = $("div#"+contentId).children("ul");
			var ulsum = uls.length;//一共有多少条数据
			var splitFlag = eval("splitFlag"+randomId);//是否有分隔线
			uls.each(function(i){
				$(this).css('display','block');
				if(splitFlag&&i<ulsum - 1){
					$(this).next().css('display','block');
				}
			});
		}
		function showPageImage(randomId,curpage){
//1展示当前页内容
			var rows = eval("rows"+randomId);//每页行数
			var contentId = eval("contentId"+randomId);
			var uls = $("div#"+contentId).children("ul");
			var ulsum = uls.length;//一共有多少条数据
			var pagesum = Math.floor((ulsum+rows-1)/rows);//一共有多少页
			//防止页面超出范围
			if(curpage>pagesum){
				curpage = pagesum;
			}else if(curpage<1){
				curpage = 1;
			}
			var begin = rows * (curpage - 1);//从第多少行开始展示
			var end = begin + rows - 1;//展示到多少行
			if(end>=ulsum){
				end = ulsum - 1;
			}
			var splitFlag = eval("splitFlag"+randomId);//是否有分隔线
			uls.each(function(i){
				if(i>=begin&&i<=end){
					$(this).css('display','block');
					if(splitFlag&&i<end&&i<ulsum - 1){
						$(this).next().css('display','block');
					}
				}else{
					$(this).css('display','none');
					if(splitFlag&&i<ulsum - 1){
						$(this).next().css('display','none');
					}
				}
			});
//2展示分页控制
			var textArr = new Array();
			textArr.push('<span class="tpb_left">第<b class="current_page">',curpage,'</b>/<b class="total_page">',pagesum,'</b>页</span> <span class="tpb_right">');
			//2.1看看是否展示 首页和前5页 链接
			if(curpage>5){
				textArr.push('<a href="javascript:showPageImage(\'',randomId,'\',1);" class="tpb_btn_previous">首页</a>&nbsp;');
				textArr.push('<a href="javascript:showPageImage(\'',randomId,'\',',curpage-5,');" class="tpb_btn_previous">[前5页]</a>&nbsp;');
			}
			//2.2看看是否展示 上一页 链接
			if(curpage>1){
				textArr.push('<a href="javascript:showPageImage(\'',randomId,'\',',curpage-1,');" class="tpb_btn_previous"><</a>&nbsp;');
			}
			//2.3展示5个页面号
			var beginpage = Math.floor((curpage-1)/5)*5+1;
			var endpage = beginpage+4;
			if(endpage>pagesum)
				endpage=pagesum;
			for(var i=beginpage;i<=endpage;i++){
				if(i==curpage){
						textArr.push('<span class=cur>',i,'</span>&nbsp;');
				}else{
						textArr.push('<a href="javascript:showPageImage(\'',randomId,'\',',i,');">',i,'</a>&nbsp;');
				}
			}
			//2.4看看是否展示 下一页 链接
			if(curpage<pagesum){
				textArr.push('<a href="javascript:showPageImage(\'',randomId,'\',',curpage+1,')" class="tpb_btn_previous">></a>&nbsp;');
			}
			//2.5是否显示 后5页和尾页 链接
			var lastbeginpage = Math.floor((pagesum-1)/5)*5+1;
			if(curpage<lastbeginpage){
				textArr.push('<a href="javascript:showPageImage(\'',randomId,'\',',curpage+5,')" class="tpb_btn_previous">[后5页]</a>&nbsp;');
				textArr.push('<a href="javascript:showPageImage(\'',randomId,'\',',pagesum,')" class="tpb_btn_previous">尾页</a>&nbsp;');
			}
			textArr.push('</span>');
			var changeId = eval("changeId"+randomId);
			$("div#"+changeId).html(textArr.join(""));	
		}
		function showImage(randomId,curpage){
			try{
				var changeId = eval("changeId"+randomId);
				if(document.getElementById(changeId)!=null){
					showPageImage(randomId,curpage);
				}else{
					showAllImage(randomId);
				}
			}catch(e){
				showAllImage(randomId);
			}
		}