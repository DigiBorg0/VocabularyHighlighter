
document.querySelectorAll('*').forEach(function(node) {

    node_text = node.innerText
    console.log(node.nodeType)

    if (node_text && node_text.includes("Pyth") && (node.nodeType==3)){
      console.log(node_text)
      console.log("found py")

      new_text = node_text.replace(/Python/g,"not_pyth");
      node.innerText=new_text

    }
});

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}

textNodesUnder(document.documentElement).forEach(function(node){
  text_in_node = node.nodeValue
  if (text_in_node.includes("Python")){
    replaced_string = text_in_node.replace(/Python/g,"<mark>Python</mark>")
    node.parentElement.innerHTML = node.parentElement.innerHTML.replace(text_in_node,replaced_string)

  }
})


})
