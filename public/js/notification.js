window.zo = (function() {
    const _module = {
		notification_html: '\
		  <style>\
		  @media only screen and (min-width: 426px) {\
			#zo-push-opt-in .dialog-opt-in {\
			  width: 422px;\
			  top: 1px;\
			  left: calc(50% - 211px);\
			  margin: 0;\
			  padding: 0;\
			  box-shadow: rgb(136, 136, 136) 0 0 4px;\
			  font-size: 11px;\
			  font-weight: 400;\
			  background: rgb(255, 255, 255);\
			}\
			#zo-push-opt-in .dialog-inner {\
			  margin: 0;\
			  padding: 0 20px 10px;\
			  word-spacing: normal!important;\
			  letter-spacing: normal!important;\
			  font-family: "Open Sans",sans-serif!important;\
			}\
		  }\
		  @media only screen and (max-width: 426px) {\
			#zo-push-opt-in .dialog-opt-in {\
			  top: 1px;\
			  margin: 0;\
			  padding: 0;\
			  box-shadow: rgb(136, 136, 136) 0 0 4px;\
			  font-size: 11px;\
			  font-weight: 400;\
			  background: rgb(255, 255, 255);\
			}\
			#zo-push-opt-in .dialog-inner {\
			  margin: 0;\
			  padding: 0 5px 8px 10px;\
			  word-spacing: normal!important;\
			  letter-spacing: normal!important;\
			  font-family: "Open Sans",sans-serif!important;\
			}\
		  }\
		  #zo-push-opt-in .dialog-opt-in {\
			position: fixed !important;\
			z-index: 2147483000 !important;\
		  }\
		  #zo-push-opt-in .app-icon {\
			float: left;\
			position: relative;\
			display: inline-block;\
			margin: 15px 15px 0 0!important;\
			padding: 0!important;\
		  }\
		  #zo-push-opt-in .app-icon img {\
			max-height: 65px!important;\
			max-width: 65px!important;\
		  }\
		  #zo-push-opt-in .dialog-content {\
			word-spacing: normal!important;\
			letter-spacing: normal!important;\
			font-family: "Open Sans",sans-serif!important;\
			position: relative!important;\
			padding: 10px 0 0!important;\
			color: #000!important;\
			text-align: left!important;\
			margin: 0!important;\
			line-height: 1.4em!important;\
			display: inline-block!important;\
			width: calc(100% - 80px)!important;\
		  }\
		  #zo-push-opt-in .dialog-title {\
			margin-bottom: 5px;\
			text-align: left;\
			font-size: 14px;\
			font-weight: 700;\
			overflow: hidden;\
			height: 2.8em;\
			line-height: 1.4em;\
			display: block;\
			font-family: "Open Sans", sans-serif !important;\
			word-spacing: normal !important;\
			letter-spacing: normal !important;\
			color: rgb(35, 35, 35);\
		  }\
		  #zo-push-opt-in .dialog-subtitle {\
			overflow: hidden;\
			height: 2.8em;\
			word-spacing: normal !important;\
			letter-spacing: normal !important;\
			font-family: "Open Sans", sans-serif !important;\
			font-size: 12px !important;\
			line-height: 1.4em !important;\
			margin: 10px 0px !important;\
			padding: 0px !important;\
			text-align: left !important;\
			color: rgb(35, 35, 35);\
		  }\
		  #zo-push-opt-in .dialog-footer {\
			clear: both;\
			word-spacing: normal!important;\
			letter-spacing: normal!important;\
			font-family: "Open Sans",sans-serif!important;\
		  }\
		  #zo-push-opt-in .dialog-branding {\
			float: left;\
			font-size: 10px;\
			margin-top: 5px;\
			font-family: "Open Sans",sans-serif!important;\
			line-height: 1.2em!important;\
			word-spacing: normal!important;\
			letter-spacing: normal!important;\
		  }\
		  #zo-push-opt-in .dialog-branding .span {\
			word-spacing: normal!important;letter-spacing: normal!important;font-family: "Open Sans",sans-serif!important;\
		  }\
		  #zo-push-opt-in .dialog-branding-text {\
			word-spacing: normal !important;\
			letter-spacing: normal !important;\
			font-family: "Open Sans", sans-serif !important;\
			text-decoration: none !important;\
			font-size: 10px !important;\
			line-height: 1.2em !important;\
			font-weight: 400 !important;\
			color: rgb(35, 35, 35);\
		  }\
		  #zo-push-opt-in .dialog-branding-img {\
			vertical-align: middle!important;\
		  }\
		  #zo-push-opt-in .txt {\
			text-decoration: none;\
			word-spacing: normal !important;\
			letter-spacing: normal !important;\
			font-family: "Open Sans", sans-serif !important;\
		  }\
		  #zo-push-opt-in .dialog-branding img {\
			margin-bottom: -3px;margin-left: 5px;word-spacing: normal!important;letter-spacing: normal!important;font-family: "Open Sans",sans-serif!important;vertical-align: bottom!important;width: 18px!important;height: 18px!important;padding-right: 2px!important;display: inline-block!important;\
		  }\
		  #zo-push-opt-in .dialog-btn-grp {\
			word-spacing: normal !important;\
			letter-spacing: normal !important;\
			font-family: "Open Sans", sans-serif !important;\
			float: right !important;\
			margin: 0 !important;\
			padding: 0 !important;\
		  }\
		  #zo-push-opt-in .dialog-btn-grp button{\
			overflow: hidden;\
			word-spacing: normal !important;\
			letter-spacing: normal !important;\
			width: 100px !important;\
			height: 26px !important;\
			font-size: 14px !important;\
			cursor: pointer !important;\
			line-height: 1em !important;\
			border-radius: 4px !important;\
			border: 1px solid rgba(0, 0, 0, 0.1) !important;\
			display: inline-block !important;\
			font-weight: 400 !important;\
			margin: 0 20px 0 0 !important;\
			padding: 5px !important;\
			text-transform: none !important;\
			box-sizing: border-box !important;\
			text-shadow: none !important;\
			box-shadow: none !important;\
			white-space: nowrap !important;\
		  }\
		  #zo-push-opt-in .dialog-end {\
			clear: both;\
			word-spacing: normal !important;\
			letter-spacing: normal !important;\
			font-family: "Open Sans", sans-serif !important;\
		  }\
		</style>\
		   <div id="zo-push-opt-in"> \
		  <div class="dialog-opt-in"> \
			<div class="dialog-inner"> \
			  <div class="app-icon"> \
			   <img src="https://png.icons8.com/windows/64/000000/credit-control.png">			\
			  </div> \
			  <div class="dialog-content"> \
				<span class="dialog-title ng-binding">This website would like to send you awesome updates and offers</span> \
				<p class="dialog-subtitle ng-binding">Notifications can be turned off anytime from browser settings</p> \
			  </div> \
			  <div class="dialog-footer"> \
						<span> \
							<a href="#" target="_blank" class="dialog-branding-text">Powered by \
								<img src="https://png.icons8.com/windows/16/000000/credit-control.png"></a> \
						</span> \
				</div> \
				<div class="dialog-btn-grp"> \
				  <button id="perm_deny" ng-style="{"color": $ctrl.pushSettingsData.optin.laterBtn.color ,"background": $ctrl.pushSettingsData.optin.laterBtn.bgColor }" class="zo-btn-later ng-binding" style="color: rgba(145, 145, 145, 1); background: rgb(255, 255, 255);">Later</button> \
				  <button id="perm_allow" ng-style="{"color": $ctrl.pushSettingsData.optin.allowBtn.color ,"background": $ctrl.pushSettingsData.optin.allowBtn.bgColor }" class="zo-btn-allow ng-binding" style="color: rgb(255, 255, 255); background: rgb(3, 169, 245);">Allow</button> \
				</div> \
				<div class="dialog-end"></div> \
			  </div> \
			</div> \
		  </div> \
		</div>',
        notification: function() {
            var bodyElt = document.getElementsByTagName("body")[0];
            var zenPushDialogIframeDiv = document.createElement('div');
            zenPushDialogIframeDiv.id = "zo-push-dialog-iframe-div";
            zenPushDialogIframeDiv.innerHTML = this.notification_html;
            bodyElt.appendChild(zenPushDialogIframeDiv);

            document.getElementById("perm_deny").addEventListener("click", function() {
                document.getElementById("zo-push-dialog-iframe-div").style.display = "none";
            });
            document.getElementById("perm_allow").addEventListener("click", function() {
                document.getElementById("zo-push-dialog-iframe-div").style.display = "none";

                window.open(
                    'https://webpush.domain.com/',
                    'targetWindow',
                    'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=340,height=220');
            });
        }
    }

    return _module;
})();