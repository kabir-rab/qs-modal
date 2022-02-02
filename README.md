> _Please note: you will have to reload the page on the browser (F5), once configured the settings. This bug will be fixed in the next version.

## UPDATE: 2022-02-02
_Conditional property panel, makes it easier to configure each button._ 
_**Bug Fix:** fixed the bug which stopped second (or more) copies from working in the same sheet. You can now use as many copies in the sheet as you like! - thanks to [Patrick Tehubijuluw](https://github.com/creatuluw "Patrick Tehubijuluw")_

# qs-modal
A Qlik Sense modal extension that allows embedding of contents and texts within Qlik Sense application. Add multiple buttons to open modals and show master visualisation or embedded contents (iFrame) within your Qlik Sense application.

## Features
* Multiple buttons to open multiple modals. Each modals/button will have their own contents
* Customise the buttons look and feel (Icons in the future roadmap).
* Add master items.
* Add iFrame -
* * via full iFrame HTML code.
* * via just the src/url.
* Add Master Items.
* * Add data export option 
* Add annotations to each modal.

## Demo
<p align="center">
  <img width="70%" alt="qs-modal preview" src="https://kabhomeblog.files.wordpress.com/2021/10/airtableqliksenseqsmodal.gif">
</p>

# How to Install
## Desktop
Download this repository. Once downloaded unzip all its content to the following folder 
> Documents\Qlik\Sense\Extensions\

## Enterprise Server / SaaS
Download this repository. Once downloaded, use the QMC to upload the zip file just like any other extensions. For SaaS, please remember to add content security policy in the admin console for any external images or iframe content you are using.

# How to use
Go to "edit" mode of a Qlik sense app. Then Custom objects > "Kab-s Extension Bundle" > qs-modal. Drag this to the workspace and resize to your requirement. Use the property panel to add button and configure the modal for each button.
