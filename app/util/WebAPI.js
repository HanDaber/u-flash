export default {
	getItems(){
		return new Promise( ( resolve )=>{
			setTimeout( ()=>{
				resolve(
					['Item 1', 'Item 2', 'Item 3', 'Fart Bubblėš'].map( ( item, i )=>{
						return { 
							key: i,
							val: item
						}
					})
				)
			}, 1500 )
		})
	}
}
