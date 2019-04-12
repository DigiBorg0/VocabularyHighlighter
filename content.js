
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

wordlists = {
  'magoosh':magoosh,
  'hongbao':ruby,
  'highschool':highschool,


}

function run(){
  chrome.storage.local.get(["wordlist"], function(result){
        console.log(result.wordlist)

        let wordlist = wordlists[result.wordlist]

        textNodesUnder(document.documentElement).forEach(function(node){

          text_array = node.nodeValue.split(" ")


            needed_to_change = []
            text_array.forEach(function(word){
              if (word){
                first_alpha = word[0].toLowerCase()
                vocabs = wordlist[first_alpha]
                if (vocabs){
                  binary_search_index = binarySearch(vocabs, word)
                  if (binary_search_index != -1){
                    needed_to_change.push(word)
                  }
                }
              }
            })
            node_text = node.nodeValue
            if (needed_to_change.length){
              needed_to_change.forEach(function(word){
                var re = new RegExp(word, "g");
                node_text = node_text.replace(re,`<span class="highlighter highlight-on">${word}</span>`)
              })

              if((node.parentElement)&&(!node.parentElement.classList.contains("highlighter"))){
                node.parentElement.innerHTML = node.parentElement.innerHTML.replace(node.nodeValue,node_text)
              }
            }



        })


  })




}

run()
setInterval(function(){ run(); }, 5000);
