const fableHome = earl + `<qr class="flex flex-center-h flex-center-v hidden"><img src="/" height="300px" width="300px"><backdrop></backdrop></qr><content class="flex flex-column"><main class="flex flex-row flex-center-h flex-center-v flex-grow container"><card class="flex flex-column flex-center-h flex-center-v gap g20 glow login"><a href="/"><i class="fa fa-catadex logo-home gradient"></i></a><form class="gap g10" action="/"><input class="text item-1" type="text" name="jsonlink" placeholder="Index JSON" value="" autocomplete="off" required> <input class="text item-2" type="text" name="channelid" placeholder="Channel ID" value="" autocomplete="off" required> <input class="submit item-3 fa" type="submit" value="s"></form></card><card class="flex flex-column flex-center-h flex-center-v gap g20 glow next hidden"><a href="/"><i class="fa fa-catadex logo-home gradient"></i></a><form class="gap g10"><input class="text item-1" type="text" name="link" placeholder="Index Link" value="" autocomplete="off" readonly="readonly"><span class="edit item-2"><i class="fa fa-edit"></i></span><span class="qr item-3"><i class="fa fa-qr"></i></span><span class="copy item-4"><i class="fa fa-copy"></i><i class="fa fa-tick"></i><i class="fa fa-fail"></i></span><span class="open item-5"><i class="fa fa-click"></i></span></form></card></main><footer></footer></content>`;
localRes("fable_home",fableHome);