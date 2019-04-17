// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({'wordlist': 'magoosh','switch':true}, function() {
          console.log('Word list is set to ' + 'magoosh');
        });
  chrome.tabs.create({
    url: 'options.html',
    active: true
  });

});
