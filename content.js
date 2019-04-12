wordlists = {
  'magoosh':magoosh,
  'hongbao':ruby,
  'highschool':highschool,
}

function binarySearch (list, value) {
  // initial values for start, middle and end
  let start = 0
  let stop = list.length - 1
  let middle = Math.floor((start + stop) / 2)

  // While the middle is not what we're looking for and the list does not have a single item
  while (list[middle] !== value && start < stop) {
    if (value < list[middle]) {
      stop = middle - 1
    } else {
      start = middle + 1
    }

    // recalculate middle on every iteration
    middle = Math.floor((start + stop) / 2)
  }

  // if the current middle item is what we're looking for return it's index, else return -1
  return (list[middle] !== value) ? -1 : middle
}


function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}

function node_needs_to_be_checked(node){
  let node_has_parent = node.parentElement? true:false
  let node_parent_contains_highlighter = node_has_parent?node.parentElement.classList.contains("highlighter"):false
  let node_text_not_all_empty = node.nodeValue.replace(/ /g, "") != "";
  console.log("has parent")
  console.log(node_has_parent)
  //console.log(!node_parent_contains_highlighter)
  //console.log(node_text_not_all_empty)
  //console.log((node_has_parent) && (!node_parent_contains_highlighter) && (node_text_not_all_empty))
  return (node_has_parent) && (!node_parent_contains_highlighter) && (node_text_not_all_empty)
}
function find_key_words_in_node(node, wordlist){
  //console.log("finding key words...")
  word_array = node.nodeValue.split(" ")
  //console.log("word array length " + word_array.length)
  //console.log(word_array)
  found_words = []
  var vocabs_with_matching_first_alpha
  word_array.forEach(function(word){
    //console.log ("word is " + word)
    if (word){
      //console.log("word is ok ")
      first_alpha = word[0].toLowerCase()
      //console.log(wordlist[first_alpha]?wordlist[first_alpha].length:0)
      if (vocabs_with_matching_first_alpha = wordlist[first_alpha]){
        if (binarySearch(vocabs_with_matching_first_alpha, word) != -1){
          found_words.push(word)
        }
      } else {
        console.log("first char is not alpha")
      }
    } else {
      //console.log("no word")
    }
  })
  console.log("found key words = " + found_words)
  return found_words.length>0?found_words:undefined

}
function highlight_text_node_with_found_words(node, found_words){
    node_text_value = node.nodeValue
    found_words.forEach(function(word){

      node_text_value = node_text_value.replace(word,`<span class="highlighter highlight-on">${word}</span>`)
      console.log(node_text_value)
    })
    return node_text_value

}
function run(){
  try{
    chrome.storage.local.get(["wordlist"], function(result){
        //console.log(result.wordlist)
        //console.log("node ocunt = "+ textNodesUnder(document.documentElement).length)
        let wordlist = wordlists[result.wordlist]
        textNodesUnder(document.documentElement).forEach(function(node){

          console.log(node)

          if(node_needs_to_be_checked(node) && (found_words = find_key_words_in_node(node, wordlist))){
            console.log("node passed check")
            updated_text_node_value = highlight_text_node_with_found_words(node,found_words)
            console.log(updated_text_node_value)
            console.log(node.parentElement)
            console.log(node.parentElement.innerHTML)
            console.log(node.nodeValue)
            // var regex_filter
            // var re
            // if (node.nodeValue.split(" ").length==1){
            //   regex_filter = `(?<=>.*?)(\\b(${node.nodeValue.split(" ")[0]}\\w*)\\b)`
            //   re = new RegExp(regex_filter, "g");
            // } else{
            //   re = node.nodeValue
            // }
            node.parentElement.innerHTML = node.parentElement.innerHTML.replace(node.nodeValue,updated_text_node_value)
            console.log(node)
          } else{
            console.log("node failed check")
          }
          console.log("----------------------------------")
        })
    })

  } catch(e){
    console.log(e)
  }

}

run()
// setInterval(function(){ run(); }, 5000);
