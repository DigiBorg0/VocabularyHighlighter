// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


document.getElementsByName("switch").forEach(
  function(button){
    button.addEventListener("click",function(target){
      let selected_button = target.value
      console.log(target.value)

    }
  )
})
