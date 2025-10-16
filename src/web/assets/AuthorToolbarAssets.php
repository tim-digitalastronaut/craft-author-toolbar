<?php

namespace digitalastronaut\craftauthortoolbar\web\assets;

use craft\web\AssetBundle;

class AuthorToolbarAssets extends AssetBundle {
    
    public function init(): void {
        $this->sourcePath = "@digitalastronaut/craftauthortoolbar/web/assets/dist";
        
        $this->css = ['index.css'];
        $this->js = [
            'index.js',
            // 'node_modules_adobe_structured-data-validator_src_types_3DModel_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_AggregateOffer_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_AggregateRating_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Brand_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_BreadcrumbList_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_BroadcastEvent_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Clip_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_HowToDirection_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_HowToSection_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_HowToStep_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_ImageObject_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_JobPosting_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_ListItem_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_MerchantReturnPolicy_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_OfferShippingDetails_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Organization_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_PeopleAudience_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Person_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_PriceSpecification_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Product_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_ProductMerchant_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_QuantitativeValue_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Rating_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Recipe_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Review_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_schemaOrg_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_ShippingDeliveryTime_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_SizeSpecification_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_VideoObject_js.js',
            // 'node_modules_adobe_structured-data-validator_src_types_Offer_js.js'
        ];
        
        parent::init();
    }
}