<?php

namespace digitalastronaut\craftauthortoolbar\web\assets;

use craft\web\AssetBundle;

class AuthorToolbarAssets extends AssetBundle {
    
    public function init(): void {
        $this->sourcePath = "@digitalastronaut/craftauthortoolbar/web/assets/dist";
        
        $this->css = ['index.css'];
        $this->js = ['index.js'];
        
        parent::init();
    }
}