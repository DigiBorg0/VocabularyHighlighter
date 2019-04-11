// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let vocab_selector = document.getElementById('vocabulary-selector');
vocab_selector.addEventListener("change", function(){
  let wordlist = vocab_selector.value
  chrome.storage.local.set({'wordlist': wordlist}, function() {
          console.log('Word list is set to ' + wordlist);
        });
})
