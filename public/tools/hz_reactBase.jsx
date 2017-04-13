// 基础函数支持,底库


// 针对 redux->applyMiddleware 中间件处理异步事件的重写
/*
	@todo 
		针对FSA规范,改写dispatch以及action内部带Promise调用:
		默认FSA不支持动作内有函数调用,但是由于目前dispatch为重写后的,
		所以NEXT才是原来的dispatch,NEXT调用时action已经是对象字面量了,
		符合FSA规范.
*/
/*
	action 例:
	PPP: (num) => ({
		type: "PPP", 
		before: Actions.PPP_BEFORE, 
		fail: Actions.PPP_FAIL,
		async: new Promise((resolve) => {
			let a = parseInt(Math.random()*100);
			setTimeout(()=>{resolve(a)}, 3000);
		})
	})
*/

const STORE_DISPATCH = (STORE) => {
	const NEXT = STORE.dispatch;
	return async function(action){
		if(action.async && (action.async instanceof Promise)){
			action.before ? NEXT(action.before()) : null;
			await new Promise(function(resolve){
				action.async.then(function(data){
					action = Object.assign({}, action, {'async': data});
					resolve(action);
				}, function(err){
					action = action.fail ? Object.assign({}, action, action.fail()) : Object.assign({}, action);
					resolve(action);
				}).catch(function(err){
					throw new Error("Error:" + err.toString());
				});
			});
		}
		NEXT(action);
	}
}


export var writeOverDispatch = STORE_DISPATCH;



