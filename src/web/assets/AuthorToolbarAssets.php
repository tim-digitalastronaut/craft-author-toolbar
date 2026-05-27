<?php
/**
 * Author toolbar plugin for Craft CMS
 *
 * A frontend toolbar that enhances the authoring experience by giving content
 * editors quick access to editing tools, entry actions, and contextual
 * controls directly from the site frontend.
 *
 * @link      https://digitalastronaut.be
 * @copyright Copyright (c) 2026 Digitalastronaut
 */

namespace digitalastronaut\craftauthortoolbar\web\assets;

use craft\web\AssetBundle;

/**
 * Class AuthorToolbarAssets
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class AuthorToolbarAssets extends AssetBundle {
    /**
     * @return void
     */
    public function init(): void {
        $this->sourcePath = "@digitalastronaut/craftauthortoolbar/web/assets/dist";
        
        $this->css = ['index.css'];
        $this->js = ['index.js'];
        
        parent::init();
    }
}