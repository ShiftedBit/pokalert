import { Injectable } from '@angular/core';

@Injectable()
export class GeoHelper {
    
    private getDestinationPoint($alat: number, $alon: number, $distance: number, $bearing: number) {
        var $pi=3.14159265358979;
        var $alatRad=$alat*$pi/180;
        var $alonRad=$alon*$pi/180;
        var $bearing=$bearing*$pi/180;
        var $alatRadSin=Math.sin($alatRad);
        var $alatRadCos=Math.cos($alatRad);
        // Ratio of distance to earth's radius
        var $angularDistance=$distance/6370.997;
        var $angDistSin=Math.sin($angularDistance);
        var $angDistCos=Math.cos($angularDistance);
        var $xlatRad = Math.asin( $alatRadSin*$angDistCos +
                                        $alatRadCos*$angDistSin*Math.cos($bearing) );
        var $xlonRad = $alonRad + Math.atan2(
                    Math.sin($bearing)*$angDistSin*$alatRadCos,
                    $angDistCos-$alatRadSin*Math.sin($xlatRad));
        // Return latitude and longitude as two element array in degrees
        var $xlat=$xlatRad*180/$pi;
        var $xlon=$xlonRad*180/$pi;
        if($xlat>90)$xlat=90;
        if($xlat<-90)$xlat=-90;
        while($xlat>180)$xlat-=360;
        while($xlat<=-180)$xlat+=360;
        while($xlon>180)$xlon-=360;
        while($xlon<=-180)$xlon+=360;
        return [$xlat,$xlon];
    }

    // Distance is in km, lat and lon are in degrees
    protected getSquareAroundPoint($lat,$lon,$distance) {
        return {
            n: this.getDestinationPoint($lat,$lon,$distance,0), // Get north point
            e: this.getDestinationPoint($lat,$lon,$distance,90), // Get east point
            s: this.getDestinationPoint($lat,$lon,$distance,180), // Get south point
            w: this.getDestinationPoint($lat,$lon,$distance,270) // Get west point
        };
    }
}