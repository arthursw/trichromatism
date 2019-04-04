/* 

Copyright 2014-2015 by Mitch Wells
www.mitchwells.com

founding code: 5-11-14
last update: 5-6-18

contact: info@mitchwells.com

*/



$(document).ready(function() {

	
	// DUPLICATE OSCILLATOR
    var original = document.getElementById('osc1');
    var clone = original.innerHTML;
    var replaced = clone.replace(/osc1/g, "osc2");
    replaced = replaced.replace('oscillator 1', 'oscillator 2');
	var newcontent = document.createElement('div');
	newcontent.id = "osc2";
	newcontent.innerHTML = replaced;
	original.parentNode.appendChild(newcontent);
	var replaced3 = clone.replace(/osc1/g, "osc3");
    replaced3 = replaced3.replace('oscillator 1', 'oscillator 3');
	var newcontent3 = document.createElement('div');
	newcontent3.id = "osc3";
	newcontent3.innerHTML = replaced3;
	original.parentNode.appendChild(newcontent3);
		    
	
	

	// ----------  MIDDLE SLIDER  ----------

    var A = parseInt($('#A').height(), 10),
        B = parseInt($('#B').height(), 10),
        Z = parseInt($('#Z').height(), 10),
        minw = 0,
        offset = $('#container').offset(),
        splitter = function(event, ui){
            var aw = parseInt(ui.position.top),
                bw =$('#container').height() - aw - ($('#Z').height()*1);
            //set widths and information...
            $('#A').css({height : aw});
            $('#B').css({height : bw});
        };
        
    $('#Z').draggable({
        axis : 'y',
        containment : [
            offset.left,
            offset.top,
            offset.right,
            offset.top + $('#container').height() - ($('#Z').height()*4)
            ],
        drag : splitter
    });

    // create variables for DOM elements

    function guiArray() {
    	
    	var guiOsc = [    	
	    	'switch',
	    	'shapeSwitch',
	    	'wave',
	    	'pulseSwitch',
	    	'pulseWidth',
	    	'pulselSwitch',
	    	'pulselOptions',
	    	'pulselShape',
	    	'pulselSlide',
	    	'pulselBPM',
	    	'pulselFreq',
	    	'pulselAmount',
	    	'pulselEnvSwitch',
	    	'pulselDelaySwitch',
	    	'pulselDelayBPM',
	    	'pulselDelay',
	    	'pulselAttackSwitch',
	    	'pulselAttackBPM',
	    	'pulselAttack',
	    	'pulselReleaseSwitch',
	    	'pulselSustainSwitch',
	    	'pulselReleaseBPM',
	    	'pulselRelease',
	    	'superSwitch',
	    	'superNumber',
	    	'superShift',
	    	'superWidth',
	    	'freqSwitch',
	    	'octave',
	    	'pitchFine',
	    	'pmlSwitch',
	    	'pmlOptions',
	    	'pmlSlide',
	    	'pmlShape',
	    	'pmlBPM',
	    	'pmlFreq',
	    	'pmlAmount',
	    	'pmlEnvSwitch',
	    	'pmlDelaySwitch',
	    	'pmlDelayBPM',
	    	'pmlDelay',
	    	'pmlAttackSwitch',
	    	'pmlAttackBPM',
	    	'pmlAttack',
	    	'pmlReleaseSwitch',
	    	'pmlSustainSwitch',
	    	'pmlReleaseBPM',
	    	'pmlRelease',
	    	'pmeSwitch',
	    	'pmeDelaySwitch',
	    	'pmeDelayBPM',
	    	'pmeDelay',
	    	'pmeAttackSwitch',
	    	'pmeInitial',
	    	'pmeAttackBPM',
	    	'pmeAttack',
	    	'pmeReleaseSwitch',
	    	'pmeSustainSwitch',
	    	'pmeTerminal',
	    	'pmeReleaseBPM',
	    	'pmeRelease',
	    	'freqFltSwitch',
	    	'freqFltType',
	    	'freqFltQ',
	    	'freqFltMix',
	    	'ampSwitch',
	    	'Amp',
	    	'amlSwitch',
	    	'amlOptions',
	    	'amlShape',
	    	'amlSlide',
	    	'amlBPM',
	    	'amlFreq',
	    	'amlAmount',
	    	'amlEnvSwitch',
	    	'amlDelaySwitch',
	    	'amlDelayBPM',
	    	'amlDelay',
	    	'amlAttackSwitch',
	    	'amlAttackBPM',
	    	'amlAttack',
	    	'amlReleaseSwitch',
	    	'amlSustainSwitch',
	    	'amlReleaseBPM',
	    	'amlRelease',
	    	'ameSwitch',
	    	'ameDelaySwitch',
	    	'ameDelayBPM',
	    	'ameDelay',
	    	'ameAttackSwitch',
	    	'ameAttackBPM',
	    	'ameAttack',
	    	'ameReleaseSwitch',
	    	'ameSustainSwitch',
	    	'ameReleaseBPM',
	    	'ameRelease',
	    	'panSwitch',
	    	'pan',
	    	'panAutoSwitch',
	    	'panAutoRate',
	    	'panAutoDepth',
	    	'convolverSwitch',
	    	'convolverType',
	    	'convolverGain',
	    	'convolverMix',
	    	'eqSwitch',
	    	'eqHCSwitch',
	    	'eqHC',
	    	'eqPSwitch',
	    	'eqPa',
	    	'eqPf',
	    	'eqLCSwitch',
	    	'eqLC'
    	];
    	
    	guiTotal = [];
    	osc1 = [];
    	osc2 = []; 
    	osc3 = [];
    	
    	var arrayLength = guiOsc.length;
		for (var i = 0; i < arrayLength; i++) {
			osc1[guiOsc[i]] = document.querySelector('#osc1_'+guiOsc[i]);
			osc2[guiOsc[i]] = document.querySelector('#osc2_'+guiOsc[i]);
			osc3[guiOsc[i]] = document.querySelector('#osc3_'+guiOsc[i]);
		}
  		
  		
  		guiTotal['osc1'] = osc1;
  		guiTotal['osc2'] = osc2;
  		guiTotal['osc3'] = osc3;
    }
    
    guiArray();
    
    
 	// ---------------------------------------------------------------------------------------
 	// -------- UPDATE PATCH WHEN PARAMETERS CHANGE (OLD WAY TO DO THIS, WILL FIX)  ----------
 	// ---------------------------------------------------------------------------------------
 	
    function updatePatch(e) {
    
    	// LOOP THROUGH OSCILLATORS
    	
    	for (var i=0; i<3; i++){
    	
    		var osc = 'osc' + (i+1);
    		var thisOsc = guiTotal[osc];
    		
    		if (thisOsc.switch.classList.contains('on')) {
    		
    			if (thisOsc.shapeSwitch.classList.contains('on')) {patch[osc+'_shapeSwitch'] = 'on'} else {patch[osc+'_shapeSwitch'] = 'off'};
    			if (thisOsc.freqSwitch.classList.contains('on')) {patch[osc+'_freqSwitch'] = 'on'} else {patch[osc+'_freqSwitch'] = 'off'};
    			if (thisOsc.ampSwitch.classList.contains('on')) {patch[osc+'_ampSwitch'] = 'on'} else {patch[osc+'_ampSwitch'] = 'off'};
    		
    			patch[osc+'_switch'] = 'on';
    			patch[osc+'_wave'] = thisOsc.wave.value;
    			
    			if (thisOsc.pulseSwitch.classList.contains('on')){
    				patch[osc+'_pulseSwitch'] = 'on';
    				patch[osc+'_pulseWidth'] = Number(thisOsc.pulseWidth.value);
    				
    				if (thisOsc.pulselSwitch.classList.contains('on')){
	    				patch[osc+'_pulselSwitch'] = 'on';
	    				patch[osc+'_pulselOptions'] = thisOsc.pulselOptions.value;
	    				patch[osc+'_pulselShape'] = thisOsc.pulselShape.value;
	    				patch[osc+'_pulselSlide'] = Number(thisOsc.pulselSlide.value);
	    				patch[osc+'_pulselBPM'] = thisOsc.pulselBPM.value;
	    				patch[osc+'_pulselFreq'] = Number(thisOsc.pulselFreq.value);
	    				patch[osc+'_pulselAmount'] = Number(thisOsc.pulselAmount.value);
	    				if (thisOsc.pulselEnvSwitch.classList.contains('on')){patch[osc+'_pulselEnvSwitch'] = 'on'} else {patch[osc+'_pulselEnvSwitch'] = 'off'};
	    				if (thisOsc.pulselDelaySwitch.classList.contains('on')){patch[osc+'_pulselDelaySwitch'] = 'on'} else {patch[osc+'_pulselDelaySwitch'] = 'off'};
	    				patch[osc+'_pulselDelayBPM'] = thisOsc.pulselDelayBPM.value;
	    				patch[osc+'_pulselDelay'] = Number(thisOsc.pulselDelay.value);
	    				if (thisOsc.pulselAttackSwitch.classList.contains('on')){patch[osc+'_pulselAttackSwitch'] = 'on'} else {patch[osc+'_pulselAttackSwitch'] = 'off'};
	    				patch[osc+'_pulselAttackBPM'] = thisOsc.pulselAttackBPM.value;
	    				patch[osc+'_pulselAttack'] = Number(thisOsc.pulselAttack.value);
	    				if (thisOsc.pulselReleaseSwitch.classList.contains('on')){patch[osc+'_pulselReleaseSwitch'] = 'on'} else {patch[osc+'_pulselReleaseSwitch'] = 'off'};
	    				if (thisOsc.pulselSustainSwitch.classList.contains('on')){patch[osc+'_pulselSustainSwitch'] = 'on'} else {patch[osc+'_pulselSustainSwitch'] = 'off'};
	    				patch[osc+'_pulselReleaseBPM'] = thisOsc.pulselReleaseBPM.value;
	    				patch[osc+'_pulselRelease'] = Number(thisOsc.pulselRelease.value);
	    				
	    				if (i == 0){osc1_pulselfo.frequency.value = patch.osc1_pulselFreq};
						if (i == 1){osc2_pulselfo.frequency.value = patch.osc2_pulselFreq};
						if (i == 2){osc3_pulselfo.frequency.value = patch.osc3_pulselFreq};
	    				
	    				if (patch[osc+'_pulselOptions'] == 'extended' && patch[osc+'_pulselShape'] != 'rnd') {
							if (i == 0){
								if (patch[osc+'_pulselShape'] != 'rsaw'){
									osc1_pulselfo.type = patch.osc1_pulselShape;
									osc1_pulselfoGain.gain.value = 1;
								} else {
									osc1_pulselfo.type = 'sawtooth'
									osc1_pulselfoGain.gain.value = -1;
								}
							}
							
							if (i == 1){
								if (patch[osc+'_pulselShape'] != 'rsaw'){
									osc2_pulselfo.type = patch.osc2_pulselShape;
									osc2_pulselfoGain.gain.value = 1;
								} else {
									osc2_pulselfo.type = 'sawtooth'
									osc2_pulselfoGain.gain.value = -1;
								}
							};
							
							if (i == 2){
								if (patch[osc+'_pulselShape'] != 'rsaw'){
									osc3_pulselfo.type = patch.osc3_pulselShape;
									osc3_pulselfoGain.gain.value = 1;
								} else {
									osc3_pulselfo.type = 'sawtooth'
									osc3_pulselfoGain.gain.value = -1;
								}
							};
							
						} else {
							if (i == 0){osc1_pulselfo.type = 'sine'};
							if (i == 1){osc2_pulselfo.type = 'sine'};
							if (i == 2){osc3_pulselfo.type = 'sine'};
						}
					
	    			} else {
		    			patch[osc+'_pulselSwitch'] = 'off';
	    			}
	    			
    			} else {
    				patch[osc+'_pulseSwitch'] = 'off';
    			}
    			
    			if (thisOsc.superSwitch.classList.contains('on')){
    				patch[osc+'_superSwitch'] = 'on';
    				patch[osc+'_superNumber'] = Number(thisOsc.superNumber.value);
    				patch[osc+'_superShift'] = Number(thisOsc.superShift.value);
    				patch[osc+'_superWidth'] = Number(thisOsc.superWidth.value);
    			} else {
    				patch[osc+'_superSwitch'] = 'off';
    			}
    			
				if (thisOsc.wave.value == 'nw' || thisOsc.wave.value == 'np' || thisOsc.wave.value == 'nb') {
					patch[osc+'_noise'] = 'on';
					// patch[osc+'_noiseFilt'] = thisOsc.noiseFilt.value;
					// patch[osc+'_noiseQ'] = Number(thisOsc.noiseQ.value);
				} else {
					patch[osc+'_noise'] = 'off';
				}
				
				if ((patch[osc+'_wave'] == 'square' && patch[osc+'_pulseSwitch'] == 'on') || patch[osc+'_noise'] == 'on'){
					$('#'+osc+'_superContainer').slideUp();
				}else{
					$('#'+osc+'_superContainer').slideDown();
				}
				
				patch[osc+'_octave'] = Number(thisOsc.octave.value);
				patch[osc+'_pitchFine'] = Number(thisOsc.pitchFine.value);
				
				if (thisOsc.pmlSwitch.classList.contains('on')) {
					patch[osc+'_pmlSwitch'] = 'on';
					patch[osc+'_pmlOptions'] = thisOsc.pmlOptions.value;
					patch[osc+'_pmlSlide'] = thisOsc.pmlSlide.value;
					patch[osc+'_pmlShape'] = thisOsc.pmlShape.value;
					
					if (patch[osc+'_pmlOptions'] == 'extended' && patch[osc+'_pmlShape'] != 'rnd') {
						if (i == 0){
							if (patch[osc+'_pmlShape'] != 'rsaw'){
								osc1_pmlfo.type = patch.osc1_pmlShape;
								osc1_pmlfoGain.gain.value = 1;
							} else {
								osc1_pmlfo.type = 'sawtooth'
								osc1_pmlfoGain.gain.value = -1;
							}
						}
						
						if (i == 1){
							if (patch[osc+'_pmlShape'] != 'rsaw'){
								osc2_pmlfo.type = patch.osc2_pmlShape;
								osc2_pmlfoGain.gain.value = 1;
							} else {
								osc2_pmlfo.type = 'sawtooth'
								osc2_pmlfoGain.gain.value = -1;
							}
						};
						
						if (i == 2){
							if (patch[osc+'_pmlShape'] != 'rsaw'){
								osc3_pmlfo.type = patch.osc3_pmlShape;
								osc3_pmlfoGain.gain.value = 1;
							} else {
								osc3_pmlfo.type = 'sawtooth'
								osc3_pmlfoGain.gain.value = -1;
							}
						};
						
					} else {
						if (i == 0){osc1_pmlfo.type = 'sine'};
						if (i == 1){osc2_pmlfo.type = 'sine'};
						if (i == 2){osc3_pmlfo.type = 'sine'};
					}
					patch[osc+'_pmlBPM'] = thisOsc.pmlBPM.value;
					patch[osc+'_pmlFreq'] = Number(thisOsc.pmlFreq.value);
					if (i == 0){osc1_pmlfo.frequency.value = patch.osc1_pmlFreq};
					if (i == 1){osc2_pmlfo.frequency.value = patch.osc2_pmlFreq};
					if (i == 2){osc3_pmlfo.frequency.value = patch.osc3_pmlFreq};
					patch[osc+'_pmlAmount'] = Number(thisOsc.pmlAmount.value);
					
					if (thisOsc.pmlSwitch.classList.contains('on')) {

						if (thisOsc.pmlEnvSwitch.classList.contains('on')) {
							patch[osc+'_pmlEnvSwitch'] = 'on';
							if (thisOsc.pmlDelaySwitch.classList.contains('on')) {
								patch[osc+'_pmlDelaySwitch'] = 'on';
								patch[osc+'_pmlDelayBPM'] = thisOsc.pmlDelayBPM.value;
								patch[osc+'_pmlDelay'] = Number(thisOsc.pmlDelay.value);
							} else {
								patch[osc+'_pmlDelaySwitch'] = 'off';
							}
							if (thisOsc.pmlAttackSwitch.classList.contains('on')) {
								patch[osc+'_pmlAttackSwitch'] = 'on';
								patch[osc+'_pmlAttackBPM'] = thisOsc.pmlAttackBPM.value;
								patch[osc+'_pmlAttack'] = Number(thisOsc.pmlAttack.value);
							} else {
								patch[osc+'_pmlAttackSwitch'] = 'off';
							}
							if (thisOsc.pmlReleaseSwitch.classList.contains('on')) {
								patch[osc+'_pmlReleaseSwitch'] = 'on';
								if (thisOsc.pmlSustainSwitch.classList.contains('on')) {
									patch[osc+'_pmlSustainSwitch'] = 'on'
								} else {
									patch[osc+'_pmlSustainSwitch'] = 'off'
								}
								patch[osc+'_pmlReleaseBPM'] = thisOsc.pmlReleaseBPM.value;
								patch[osc+'_pmlRelease'] = Number(thisOsc.pmlRelease.value);
							} else {
								patch[osc+'_pmlReleaseSwitch'] = 'off';
							}
						} else {
							patch[osc+'_pmlEnvSwitch'] = 'off';
						}	
						
					} 
					
				} else {
					patch[osc+'_pmlSwitch'] = 'off';
				}
					
				if (thisOsc.pmeSwitch.classList.contains('on')) {
					patch[osc+'_pmeSwitch'] = 'on';
					if (thisOsc.pmeDelaySwitch.classList.contains('on')) {
						patch[osc+'_pmeDelaySwitch'] = 'on';
						patch[osc+'_pmeDelayBPM'] = thisOsc.pmeDelayBPM.value;
						patch[osc+'_pmeDelay'] = Number(thisOsc.pmeDelay.value);
					} else {
						patch[osc+'_pmeDelaySwitch'] = 'off';
					}
					if (thisOsc.pmeAttackSwitch.classList.contains('on')) {
						patch[osc+'_pmeAttackSwitch'] = 'on';
						patch[osc+'_pmeInitial'] = Number(thisOsc.pmeInitial.value);
						patch[osc+'_pmeAttackBPM'] = thisOsc.pmeAttackBPM.value;
						patch[osc+'_pmeAttack'] = Number(thisOsc.pmeAttack.value);
					} else {
						patch[osc+'_pmeAttackSwitch'] = 'off';
					}
					if (thisOsc.pmeReleaseSwitch.classList.contains('on')) {
						patch[osc+'_pmeReleaseSwitch'] = 'on';
						if (thisOsc.pmeSustainSwitch.classList.contains('on')) {
							patch[osc+'_pmeSustainSwitch'] = 'on'
						} else {
							patch[osc+'_pmeSustainSwitch'] = 'off'
						};
						patch[osc+'_pmeTerminal'] = Number(thisOsc.pmeTerminal.value);
						patch[osc+'_pmeReleaseBPM'] = thisOsc.pmeReleaseBPM.value;
						patch[osc+'_pmeRelease'] = Number(thisOsc.pmeRelease.value);
					} else {
						patch[osc+'_pmeReleaseSwitch'] = 'off';
					}
				} else {
					patch[osc+'_pmeSwitch'] = 'off'
				}
								
				if (thisOsc.freqFltSwitch.classList.contains('on')) {
					patch[osc+'_freqFltSwitch'] = 'on';
					patch[osc+'_freqFltType'] = thisOsc.freqFltType.value;
					patch[osc+'_freqFltQ'] = Number(thisOsc.freqFltQ.value);
					patch[osc+'_freqFltMix'] = Number(thisOsc.freqFltMix.value);
				} else {
					patch[osc+'_freqFltSwitch'] = 'off';
				}
				
				patch[osc+'_Amp'] = Number(thisOsc.Amp.value);
				
				if (thisOsc.amlSwitch.classList.contains('on')) {
					patch[osc+'_amlSwitch'] = 'on';
					patch[osc+'_amlOptions'] = thisOsc.amlOptions.value;
					patch[osc+'_amlShape'] = thisOsc.amlShape.value;
						if (patch[osc+'_amlOptions'] == "extended" && patch[osc+'_amlShape'] != 'rnd') {
							
							if (i == 0){
								if (patch[osc+'_amlShape'] != 'rsaw'){
									osc1_amlfo.type = patch.osc1_amlShape;
									osc1_amlfoGain.gain.value = 1;
								} else {
									osc1_amlfo.type = 'sawtooth'
									osc1_amlfoGain.gain.value = -1;
								}
							}
							
							if (i == 1){
								if (patch[osc+'_amlShape'] != 'rsaw'){
									osc2_amlfo.type = patch.osc2_amlShape;
									osc2_amlfoGain.gain.value = 1;
								} else {
									osc2_amlfo.type = 'sawtooth'
									osc2_amlfoGain.gain.value = -1;
								}
							};
							
							if (i == 2){
								if (patch[osc+'_amlShape'] != 'rsaw'){
									osc3_amlfo.type = patch.osc3_amlShape;
									osc3_amlfoGain.gain.value = 1;
								} else {
									osc3_amlfo.type = 'sawtooth'
									osc3_amlfoGain.gain.value = -1;
								}
							}
							
						} else {
							if (i == 0){osc1_amlfo.type = 'sine'};
							if (i == 1){osc2_amlfo.type = 'sine'};
							if (i == 2){osc3_amlfo.type = 'sine'};
						}
					patch[osc+'_amlSlide'] = thisOsc.amlShape.value;
					patch[osc+'_amlBPM'] = thisOsc.amlBPM.value;
					patch[osc+'_amlFreq'] = Number(thisOsc.amlFreq.value);
						if (i == 0){osc1_amlfo.frequency.value = patch.osc1_amlFreq};
						if (i == 1){osc2_amlfo.frequency.value = patch.osc2_amlFreq};
						if (i == 2){osc3_amlfo.frequency.value = patch.osc3_amlFreq};
					patch[osc+'_amlAmount'] = Number(thisOsc.amlAmount.value);
					if (thisOsc.amlEnvSwitch.classList.contains('on')) {
						patch[osc+'_amlEnvSwitch'] = 'on';
						if (thisOsc.amlDelaySwitch.classList.contains('on')) {
							patch[osc+'_amlDelaySwitch'] = 'on';
							patch[osc+'_amlDelayBPM'] = thisOsc.amlDelayBPM.value;
							patch[osc+'_amlDelay'] = Number(thisOsc.amlDelay.value);
						} else {
							patch[osc+'_amlDelaySwitch'] = 'off';
						}
						if (thisOsc.amlAttackSwitch.classList.contains('on')) {
							patch[osc+'_amlAttackSwitch'] = 'on';
							patch[osc+'_amlAttackBPM'] = thisOsc.amlAttackBPM.value;
							patch[osc+'_amlAttack'] = Number(thisOsc.amlAttack.value);
						} else {
							patch[osc+'amlAttackSwitch'] = 'off';
						}
						if (thisOsc.amlReleaseSwitch.classList.contains('on')) {
							patch[osc+'_amlReleaseSwitch'] = 'on';
							if (thisOsc.amlSustainSwitch.classList.contains('on')) {
								patch[osc+'_amlSustainSwitch'] = 'on'
							} else {
								patch[osc+'_amlSustainSwitch'] = 'off'
							}
							patch[osc+'_amlReleaseBPM'] = thisOsc.amlReleaseBPM.value;
							patch[osc+'_amlRelease'] = Number(thisOsc.amlRelease.value)
						} else {
							patch[osc+'_amlReleaseSwitch'] = 'off'
						}
					} else {
						patch[osc+'_amlEnvSwitch'] = 'off'
					}	
					
				} else {
					patch[osc+'_amlSwitch'] = 'off'
				}
				
				if (thisOsc.ameSwitch.classList.contains('on')) {
					patch[osc+'_ameSwitch'] = 'on';
					if (thisOsc.ameDelaySwitch.classList.contains('on')) {
						patch[osc+'_ameDelaySwitch'] = 'on';
						patch[osc+'_ameDelayBPM'] = thisOsc.ameDelayBPM.value;
						patch[osc+'_ameDelay'] = Number(thisOsc.ameDelay.value);
					} else {
						patch[osc+'_ameDelaySwitch'] = 'off'
					}
					if (thisOsc.ameAttackSwitch.classList.contains('on')) {
						patch[osc+'_ameAttackSwitch'] = 'on';
						patch[osc+'_ameAttackBPM'] = thisOsc.ameAttackBPM.value;
						patch[osc+'_ameAttack'] = Number(thisOsc.ameAttack.value);
					} else {
						patch[osc+'_ameAttackSwitch'] = 'off'
					}
					if (thisOsc.ameReleaseSwitch.classList.contains('on')) {
						patch[osc+'_ameReleaseSwitch'] = 'on';
						if (thisOsc.ameSustainSwitch.classList.contains('on')) {
							patch[osc+'_ameSustainSwitch'] = 'on'
						} else {
							patch[osc+'_ameSustainSwitch'] = 'off'
						}
						patch[osc+'_ameReleaseBPM'] = thisOsc.ameReleaseBPM.value;
						patch[osc+'_ameRelease'] = Number(thisOsc.ameRelease.value);
					} else {
						patch[osc+'_ameReleaseSwitch'] = 'off';
					}
				} else {
					patch[osc+'_ameSwitch'] = 'off'
				}
    	
    			if (thisOsc.panSwitch.classList.contains('on')) {
    				patch[osc+'_panSwitch'] = 'on';
    				patch[osc+'_pan'] = Number(thisOsc.pan.value);
    				if (thisOsc.panAutoSwitch.classList.contains('on')) {
    					patch[osc+'_panAutoSwitch'] = 'on';
    					patch[osc+'_panAutoRate'] = Number(thisOsc.panAutoRate.value);
    					patch[osc+'_panAutoDepth'] = Number(thisOsc.panAutoDepth.value);
    					
    					if (osc == 'osc1'){osc1_panlfo.frequency.value = patch['osc1_panAutoRate']; osc1_panlfoGain.gain.value = patch['osc1_panAutoDepth'] *.01;}
    					if (osc == 'osc2'){osc2_panlfo.frequency.value = patch['osc2_panAutoRate']; osc2_panlfoGain.gain.value = patch['osc2_panAutoDepth'] *.01;}
    					if (osc == 'osc3'){osc3_panlfo.frequency.value = patch['osc3_panAutoRate']; osc3_panlfoGain.gain.value = patch['osc3_panAutoDepth'] *.01;}
    					
    				} else {
    					patch[osc+'_panAutoSwitch'] = 'off';
    				}
    			} else {
    				patch[osc+'_panSwitch'] = 'off';
    			}
				
				if (thisOsc.convolverSwitch.classList.contains('on')) {
					patch[osc+'_convolverSwitch'] = 'on';
					patch[osc+'_convolverType'] = thisOsc.convolverType.value;
					patch[osc+'_convolverGain'] = thisOsc.convolverGain.value;
					patch[osc+'_convolverMix'] = Number(thisOsc.convolverMix.value);

				} else {
					patch[osc+'_convolverSwitch'] = 'off';
				}
				
				if (thisOsc.eqSwitch.classList.contains('on')) {
					patch[osc+'_eqSwitch'] = 'on';
					
					if (thisOsc.eqHCSwitch.classList.contains('on')) {
						patch[osc+'_eqHCSwitch'] = 'on';
						patch[osc+'_eqHC'] = Number(thisOsc.eqHC.value);
					} else {
						patch[osc+'_eqHCSwitch'] = 'off';
					}
					
					if (thisOsc.eqPSwitch.classList.contains('on')) {
						patch[osc+'_eqPSwitch'] = 'on';
						patch[osc+'_eqPa'] = Number(thisOsc.eqPa.value);
						patch[osc+'_eqPf'] = Number(thisOsc.eqPf.value);
					} else {
						patch[osc+'_eqPSwitch'] = 'off';
					}
					
					if (thisOsc.eqLCSwitch.classList.contains('on')) {
						patch[osc+'_eqLCSwitch'] = 'on';
						patch[osc+'_eqLC'] = Number(thisOsc.eqLC.value);
					} else {
						patch[osc+'_eqLCSwitch'] = 'off';
					}


				} else {
					patch[osc+'_eqSwitch'] = 'off';
				}
				
											
    		} else {
				patch[osc+'_switch'] = 'off';
			}

    	}
		
		if($('#flts').parent().hasClass('on')){patch["flts_switch"] = 'on'} else {patch["flts_switch"] = 'off'};
		
		if($('#fltMtx').parent().hasClass('on')){
		
			patch["fltMtx_switch"] = 'on';
			patch["fltMtx_preset"] = $('#fltMtxPre').val();
			patch["fltMtx_oscsToF1"] = Number($('#fltMtxo2f1').val());
			patch["fltMtx_oscsToF2"] = Number($('#fltMtxo2f2').val());
			patch["fltMtx_oscsToVE"] = Number($('#fltMtxo2ve').val());
			patch["fltMtx_F1ToF2"] = Number($('#fltMtxf12f2').val());
			patch["fltMtx_F1ToVE"] = Number($('#fltMtxf12ve').val());
			// patch["fltMtx_F2ToF1"] = Number($('#fltMtxf22f1').val());
			patch["fltMtx_F2ToVE"] = Number($('#fltMtxf22ve').val());
			
		} else { patch["fltMtx_switch"] = 'off' }
		
		if($('#flt1').parent().hasClass('on')){
		
			patch["flt1_switch"] = 'on';
			patch["flt1_type"] = $('#flt1type').val();
			patch["flt1_cutoff"] = Number($('#flt1cut').val());
			patch["flt1_q"] = Number($('#flt1res').val());
			
			if($('#flt1followSwitch').parent().hasClass('on')){
				patch["flt1followSwitch"] = 'on';
				patch["flt1follow"] = Number($('#flt1follow').val());
			} else {
				patch["flt1followSwitch"] = 'off';
			}
			
			if($('#flt1lSwitch').parent().hasClass('on')){
				patch["flt1_lSwitch"] = 'on';
				patch["flt1_lOptions"] = $('#flt1lOptions').val();
				patch["flt1_lShape"] = $('#flt1lShape').val();
				if (patch.flt1_lOptions == "extended") {
					if (patch.flt1_lShape == 'rnd'){
						$('#flt1lrnd').slideDown();
						patch["flt1_lSlide"] = $('#flt1lSlide').val();
					} else {
						$('#flt1lrnd').slideUp();
						if (patch.flt1_lShape != 'rsaw'){
							flt1_pmlfo.type = patch.flt1_lShape;
							flt1_pmlfoRev.gain.value = 1;
						} else {
							flt1_pmlfo.type = 'sawtooth'
							flt1_pmlfoRev.gain.value = -1;
						}
					}
					if($('#flt1lEnvSwitch').parent().hasClass('on')){
						patch["flt1_lEnvSwitch"] = 'on';
						if($('#flt1lDelaySwitch').parent().hasClass('on')){
							patch["flt1_lDelaySwitch"] = 'on';
							patch["flt1_lDelay"] = Number($('#flt1lDelay').val());
						} else {
							patch["flt1_lDelaySwitch"] = 'off';
						}
						if($('#flt1lAttackSwitch').parent().hasClass('on')){
							patch["flt1_lAttackSwitch"] = 'on';
							patch["flt1_lAttack"] = Number($('#flt1lAttack').val());
						} else {
							patch["flt1_lAttackSwitch"] = 'off';
						}
						if($('#flt1lReleaseSwitch').parent().hasClass('on')){
							patch["flt1_lReleaseSwitch"] = 'on';
							patch["flt1_lRelease"] = Number($('#flt1lRelease').val());
							if($('#flt1lSustainSwitch').parent().hasClass('on')){
								patch["flt1_lSustainSwitch"] = 'on';
							} else {
								patch["flt1_lSustainSwitch"] = 'off';
							}
						} else {
							patch["flt1_lReleaseSwitch"] = 'off';
						}
					} else {
						patch["flt1_lEnvSwitch"] = 'off';
					}
										
				} else {
					flt1_pmlfo.type = 'sine';
				}
				
				patch["flt1_lBPM"] = $('#flt1lBPM').val();
				patch["flt1_lFreq"] = Number($('#flt1lFreq').val());
				flt1_pmlfo.frequency.value = patch.flt1_lFreq;
				patch["flt1_lAmount"] = Number($('#flt1lAmount').val());
			} else {patch["flt1_lSwitch"] = 'off'}
			
			if($('#flt1eSwitch').parent().hasClass('on')){
				patch["flt1_eSwitch"] = 'on';
				if($('#flt1eAttackSwitch').parent().hasClass('on')){
					patch["flt1_eAttackSwitch"] = 'on';
					patch["flt1_eInitial"] = Number($('#flt1eStart').val());
					patch["flt1_eAttack"] = Number($('#flt1eAttack').val());
				} else {
					patch["flt1_eAttackSwitch"] = 'off'
				}
				if($('#flt1eReleaseSwitch').parent().hasClass('on')){
					patch["flt1_eReleaseSwitch"] = 'on';
					if($('#flt1eSustainSwitch').parent().hasClass('on')){patch["flt1_eSustainSwitch"] = 'on'}else{patch["flt1_eSustainSwitch"] = 'off'}
					patch["flt1_eRelease"] = Number($('#flt1eRelease').val());
					patch["flt1_eTerminal"] = Number($('#flt1eEnd').val());
				} else {
					patch["flt1_eReleaseSwitch"] = 'off';
				}
			} else {patch["flt1_eSwitch"] = 'off'}
			
		} else {patch["flt1_switch"] = 'off'}
		
		if($('#flt2').parent().hasClass('on')){
	
			patch["flt2_switch"] = 'on';
			patch["flt2_type"] = $('#flt2type').val();
			patch["flt2_cutoff"] = Number($('#flt2cut').val());
			patch["flt2_q"] = Number($('#flt2res').val());
			
			if($('#flt2followSwitch').parent().hasClass('on')){
				patch["flt2followSwitch"] = 'on';
				patch["flt2follow"] = Number($('#flt2follow').val());
			} else {
				patch["flt2followSwitch"] = 'off';
			}
		
			if($('#flt2lSwitch').parent().hasClass('on')){
			
				patch["flt2_lSwitch"] = 'on';
				patch["flt2_lOptions"] = $('#flt2lOptions').val();
				patch["flt2_lShape"] = $('#flt2lShape').val();
				
				if (patch.flt2_lOptions == "extended") {
					if (patch.flt2_lShape == 'rnd'){
						$('#flt2lrnd').slideDown();
						patch["flt2_lSlide"] = $('#flt2lSlide').val();
					} else {
						$('#flt2lrnd').slideUp();
						if (patch.flt2_lShape != 'rsaw'){
							flt2_pmlfo.type = patch.flt2_lShape;
							flt2_pmlfoRev.gain.value = 1;
						} else {
							flt2_pmlfo.type = 'sawtooth'
							flt2_pmlfoRev.gain.value = -1;
						}
					}
					if($('#flt2lEnvSwitch').parent().hasClass('on')){
						patch["flt2_lEnvSwitch"] = 'on';
						if($('#flt2lDelaySwitch').parent().hasClass('on')){
							patch["flt2_lDelaySwitch"] = 'on';
							patch["flt2_lDelay"] = Number($('#flt2lDelay').val());
						} else {
							patch["flt2_lDelaySwitch"] = 'off';
						}
						if($('#flt2lAttackSwitch').parent().hasClass('on')){
							patch["flt2_lAttackSwitch"] = 'on';
							patch["flt2_lAttack"] = Number($('#flt2lAttack').val());
						} else {
							patch["flt2_lAttackSwitch"] = 'off';
						}
						if($('#flt2lReleaseSwitch').parent().hasClass('on')){
							patch["flt2_lReleaseSwitch"] = 'on';
							patch["flt2_lRelease"] = Number($('#flt2lRelease').val());
							if($('#flt2lSustainSwitch').parent().hasClass('on')){
								patch["flt2_lSustainSwitch"] = 'on';
							} else {
								patch["flt2_lSustainSwitch"] = 'off';
							}
						} else {
							patch["flt2_lReleaseSwitch"] = 'off';
						}
					} else {
						patch["flt2_lEnvSwitch"] = 'off';
					}
										
				} else {
					flt2_pmlfo.type = 'sine';
				}
				
				patch["flt2_lBPM"] = $('#flt2lBPM').val();
				patch["flt2_lFreq"] = Number($('#flt2lFreq').val());
				flt2_pmlfo.frequency.value = patch.flt2_lFreq;
				patch["flt2_lAmount"] = Number($('#flt2lAmount').val());
				
			} else {patch["flt2_lSwitch"] = 'off'}
			
			if($('#flt2eSwitch').parent().hasClass('on')){
				patch["flt2_eSwitch"] = 'on';
				if($('#flt2eAttackSwitch').parent().hasClass('on')){
					patch["flt2_eAttackSwitch"] = 'on';
					patch["flt2_eInitial"] = Number($('#flt2eStart').val());
					patch["flt2_eAttack"] = Number($('#flt2eAttack').val());
				} else {
					patch["flt2_eAttackSwitch"] = 'off'
				}
				if($('#flt2eReleaseSwitch').parent().hasClass('on')){
					patch["flt2_eReleaseSwitch"] = 'on';
					if($('#flt2eSustainSwitch').parent().hasClass('on')){patch["flt2_eSustainSwitch"] = 'on'}else{patch["flt2_eSustainSwitch"] = 'off'}
					patch["flt2_eRelease"] = Number($('#flt2eRelease').val());
					patch["flt2_eTerminal"] = Number($('#flt2eEnd').val());
				} else {
					patch["flt2_eReleaseSwitch"] = 'off';
				}
			} else {patch["flt2_eSwitch"] = 'off'}
			
		} else {patch["flt2_switch"] = 'off'}
		
		// AMPLITUDE ENVELOPE
		
		if($('#ampEnv').parent().hasClass('on')){
			patch["ae_switch"] = 'on';
			if($('#ampEnvAttackSwitch').parent().hasClass('on')){
				patch["ae_attackSwitch"] = 'on';
				// patch["ae_attackType"] = $('#ampEnvAttackType').val();
				patch["ae_attackTime"] = Number($('#ampEnvAttackTime').val());
				patch["ae_attackTimeBPM"] = $('#ampEnvAttackTimeBPM').val();
				if($('#ampEnvAttackPart1Switch').parent().hasClass('on')){
					patch["ae_attackPart1Switch"] = 'on';
					patch["ae_attackPart1Shape"] = $('#ampEnvAttackPart1Shape').val();
					patch["ae_attackPart1TimeBPM"] = $('#ampEnvAttackPart1TimeBPM').val();
					patch["ae_attackPart1Time"] = Number($('#ampEnvAttackPart1Time').val());
					patch["ae_attackPart1Level"] = Number($('#ampEnvAttackPart1Level').val());
				} else {
					patch["ae_attackPart1Switch"] = 'off';
				};
				if($('#ampEnvAttackPart2Switch').parent().hasClass('on')){
					patch["ae_attackPart2Switch"] = 'on';
					patch["ae_attackPart2Shape"] = $('#ampEnvAttackPart2Shape').val();
					patch["ae_attackPart2TimeBPM"] = $('#ampEnvAttackPart2TimeBPM').val();
					patch["ae_attackPart2Time"] = Number($('#ampEnvAttackPart2Time').val());
					patch["ae_attackPart2Level"] = Number($('#ampEnvAttackPart2Level').val());
				} else {
					patch["ae_attackPart2Switch"] = 'off';
				};
			} else {
				patch["ae_attackSwitch"] = 'off';
			};
			
			if($('#ampEnvDecaySwitch').parent().hasClass('on')){
				patch["ae_decaySwitch"] = 'on';
				patch["ae_decayType"] = $('#ampEnvDecayType').val();
				patch["ae_decayShape"] = $('#ampEnvDecayShape').val();
				patch["ae_decayTimeBPM"] = $('#ampEnvDecayTimeBPM').val();
				patch["ae_decayTime"] = Number($('#ampEnvDecay').val());
				patch["ae_decayLevel"] = Number($('#ampEnvDecayLevel').val());
			} else {
				patch["ae_decaySwitch"] = 'off';
			};
			
			if($('#ampEnvSustainSwitch').parent().hasClass('on')){
				patch["ae_sustainSwitch"] = 'on';
				
				if($('#ampEnvSustainSwitchMax').parent().hasClass('on')){
					patch["ae_sustainMaxSwitch"] = 'on';
					patch["ae_sustainTimeBPM"] = $('#ampEnvSustainMaxTimeBPM').val();
					patch["ae_sustainMaxTime"] = Number($('#ampEnvSustainTimeMax').val());
				} else {
					patch["ae_sustainMaxSwitch"] = 'off';
				};
					
			} else {
				patch["ae_sustainSwitch"] = 'off';
			};
			
			if($('#ampEnvHoldSwitch').parent().hasClass('on')){
				patch["ae_holdSwitch"] = 'on';
				patch["ae_holdTimeBPM"] = $('#ampEnvHoldBPM').val();
				patch["ae_holdTime"] = Number($('#ampEnvHold').val());
			} else {
				patch["ae_holdSwitch"] = 'off';
			};
			
			if($('#ampEnvReleaseSwitch').parent().hasClass('on')){
				patch["ae_releaseSwitch"] = 'on';
				// patch["ae_releaseType"] = $('#ampEnvReleaseType').val();
				patch["ae_releaseTimeBPM"] = $('#ampEnvReleaseTimeBPM').val();
				patch["ae_releaseTime"] = Number($('#ampEnvReleaseTime').val());
				
				if($('#ampEnvReleasePart1Switch').parent().hasClass('on')){
					patch["ae_releasePart1Switch"] = 'on';
					patch["ae_releasePart1Shape"] = $('#ampEnvReleasePart1Shape').val();
					patch["ae_releasePart1TimeBPM"] = $('#ampEnvReleasePart1TimeBPM').val();
					patch["ae_releasePart1Time"] = Number($('#ampEnvReleasePart1Time').val());
					patch["ae_releasePart1Level"] = Number($('#ampEnvReleasePart1Level').val());
				} else {
					patch["ae_releasePart1Switch"] = 'off';
				};
				
				if($('#ampEnvReleasePart2Switch').parent().hasClass('on')){
					patch["ae_releasePart2Switch"] = 'on';
					patch["ae_releasePart2Shape"] = $('#ampEnvReleasePart2Shape').val();
					patch["ae_releasePart2TimeBPM"] = $('#ampEnvReleasePart2TimeBPM').val();
					patch["ae_releasePart2Time"] = Number($('#ampEnvReleasePart2Time').val());
					patch["ae_releasePart2Level"] = Number($('#ampEnvReleasePart2Level').val());
				} else {
					patch["ae_releasePart2Switch"] = 'off';
				};
				
				if($('#ampEnvReleasePart3Switch').parent().hasClass('on')){
					patch["ae_releasePart3Switch"] = 'on';
					patch["ae_releasePart3Shape"] = $('#ampEnvReleasePart3Shape').val();
					patch["ae_releasePart3TimeBPM"] = $('#ampEnvReleasePart3TimeBPM').val();
					patch["ae_releasePart3Time"] = Number($('#ampEnvReleasePart3Time').val());
				} else {
					patch["ae_releasePart3Switch"] = 'off';
				};


				
			} else {
				patch["ae_releaseSwitch"] = 'off';
			};
			
		} else {
			patch["ae_switch"] = 'off';
		};
		
		
		if($('#effects').parent().hasClass('on')){patch["effects_switch"] = 'on'} else {patch["effects_switch"] = 'off'};
		
		if($('#distortion').parent().hasClass('on')){patch["distortion_switch"] = 'on'} else {patch["distortion_switch"] = 'off'};
		patch["distortion_curve"] = Number($('#distortionCurve').val());
		distortion.curveAmount = patch.distortion_curve*.09;
		if($('#distortionEQSwitch').parent().hasClass('on')){patch["distortion_EQswitch"] = 'on'} else {patch["distortion_EQswitch"] = 'off'};
		patch["distortion_hc"] = Number($('#distortionHC').val());
		distortionHC.frequency.value = patch.distortion_hc;
		patch["distortion_hcQ"] = Number($('#distortionHCQ').val());
		distortionHC.Q.value = patch.distortion_hcQ;
		patch["distortion_lc"] = Number($('#distortionLC').val());
		distortionLC.frequency.value = patch.distortion_lc;
		patch["distortion_lcQ"] = Number($('#distortionLCQ').val());
		distortionLC.Q.value = patch.distortion_lcQ;
		patch["distortion_level"] = Number($('#distortionLevel').val());
		distortionLevel.gain.value = patch.distortion_level*.01;
		patch["distortion_mix"] = Number($('#distortionMix').val());
		distortionMix.gain.value = Math.cos((1.0 - (patch.distortion_mix *.01)) * 0.5*Math.PI);
		distortionDirect.gain.value = Math.cos((patch.distortion_mix *.01) * 0.5*Math.PI);
		
		if($('#delay').parent().hasClass('on')){
			patch["delay_switch"] = 'on';
			patch["delay_timeBPM"] = $('#delayTimeBPM').val();
			if(patch.delay_timeBPM != "off"){
	    		var newFreq = Number(patch.delay_timeBPM) / Number(patch.bpm);
	    		patch["delay_time"] = newFreq;
	    	} else {
	    		var newFreq = Number($('#delayTime').val());
	    		patch["delay_time"] = newFreq;
	    	}
			delay.delayTime.value = patch.delay_time;
			patch["delay_fb"] = Number($('#delayFeedback').val());
			delayFB.gain.value = patch.delay_fb*.01;
			if($('#delayEQSwitch').parent().hasClass('on')){patch["delay_EQswitch"] = 'on'} else {patch["delay_EQswitch"] = 'off'};
			patch["delay_hc"] = Number($('#delayHC').val());
			delayHC.frequency.value = patch.delay_hc;
			patch["delay_lc"] = Number($('#delayLC').val());
			delayLC.frequency.value = patch.delay_lc;
			patch["delay_mix"] = Number($('#delayMix').val());
			delayMix.gain.value = Math.cos((1.0 - (patch.delay_mix *.01)) * 0.5*Math.PI);
			delayDirect.gain.value = Math.cos((patch.delay_mix *.01) * 0.5*Math.PI);
		} else {
			patch["delay_switch"] = 'off';
			delayFB.gain.value = 0;
		};
		
		if($('#dualDelay').parent().hasClass('on')){
			patch["dualDelay_switch"] = 'on';
			patch["dualDelay_TimeABPM"] = $('#ddTimeABPM').val();
			if(patch.dualDelay_TimeABPM != "off"){
	    		var newFreq = Number(patch.dualDelay_TimeABPM) / Number(patch.bpm);
	    		patch["dualDelay_TimeA"] = newFreq;
	    	} else {
	    		var newFreq = Number($('#ddTimeA').val());
	    		patch["dualDelay_TimeA"] = newFreq;
	    	}
	    	ddA.delayTime.value = patch.dualDelay_TimeA;
			patch["dualDelay_TimeBBPM"] = $('#ddTimeBBPM').val();
			if(patch.dualDelay_TimeBBPM != "off"){
	    		var newFreq = Number(patch.dualDelay_TimeBBPM) / Number(patch.bpm);
	    		patch["dualDelay_TimeB"] = newFreq;
	    	} else {
	    		var newFreq = Number($('#ddTimeB').val());
	    		patch["dualDelay_TimeB"] = newFreq;
	    	}
	    	ddB.delayTime.value = patch.dualDelay_TimeB;
			patch["dualDelay_InputA"] = Number($('#ddInputA').val());
			ddInputA.gain.value = patch.dualDelay_InputA*.01;
			patch["dualDelay_fbA"] = Number($('#ddFeedbackA').val());
			ddAFB.gain.value = patch.dualDelay_fbA*.01;
			patch["dualDelay_AtoB"] = Number($('#ddAtoB').val());
			ddAtoB.gain.value = patch.dualDelay_AtoB*.01;
			patch["dualDelay_PanA"] = Number($('#ddPanA').val());
			ddApanLeft.gain.value = ( patch.dualDelay_PanA * -0.005 ) + 0.5;
			ddApanRight.gain.value = ( patch.dualDelay_PanA * 0.005 ) + 0.5;
			patch["dualDelay_AtoOut"] = Number($('#ddAtoOut').val());
			ddAtoOut.gain.value = patch.dualDelay_AtoOut*.01;
			patch["dualDelay_InputB"] = Number($('#ddInputB').val());
			ddInputB.gain.value = patch.dualDelay_InputB*.01;
			patch["dualDelay_fbB"] = Number($('#ddFeedbackB').val());
			ddBFB.gain.value = patch.dualDelay_fbB*.01;
			patch["dualDelay_BtoA"] = Number($('#ddBtoA').val());
			ddBtoA.gain.value = patch.dualDelay_BtoA*.01;
			patch["dualDelay_PanB"] = Number($('#ddPanB').val());
			ddBpanLeft.gain.value = ( patch.dualDelay_PanB * -0.005 ) + 0.5;
			ddBpanRight.gain.value = ( patch.dualDelay_PanB * 0.005 ) + 0.5;
			patch["dualDelay_BtoOut"] = Number($('#ddBtoOut').val());
			ddBtoOut.gain.value = patch.dualDelay_BtoOut*.01;
			patch["dualDelay_Mix"] = Number($('#ddMix').val());
			ddMix.gain.value = Math.cos((1.0 - (patch.dualDelay_Mix *.01)) * 0.5*Math.PI);
			ddDirect.gain.value = Math.cos((patch.dualDelay_Mix *.01) * 0.5*Math.PI);
			
			if($('#ddEQSwitch').parent().hasClass('on')){patch["dualDelay_EQswitch"] = 'on'} else {patch["dualDelay_EQswitch"] = 'off'};
			patch["dualDelay_hcA"] = Number($('#ddHCA').val());
			ddHCA.frequency.value = patch.dualDelay_hcA;
			patch["dualDelay_lcA"] = Number($('#ddLCA').val());
			ddLCA.frequency.value = patch.dualDelay_lcA;
			patch["dualDelay_hcB"] = Number($('#ddHCB').val());
			ddHCB.frequency.value = patch.dualDelay_hcB;
			patch["dualDelay_lcB"] = Number($('#ddLCB').val());
			ddLCB.frequency.value = patch.dualDelay_lcB;
			// if(patch.dualDelay_EQswitch == "off"){ddHCA.frequency.value = 20000; ddLCA.frequency.value = 10; ddHCB.frequency.value = 20000; ddLCB.frequency.value = 10}
		} else {
			patch["dualDelay_switch"] = 'off';
			ddAFB.gain.value = 0;
			ddBFB.gain.value = 0;
			ddAtoB.gain.value = 0;
			ddBtoA.gain.value = 0;
		};
		
		if($('#modulation').parent().hasClass('on')){
			patch["modulation_switch"] = 'on';
		} else {
			patch["modulation_switch"] = 'off';
		}
		
		if($('#chorusSwitch').parent().hasClass('on')){
			patch["chorus_switch"] = 'on';
			patch["chorus_mix"] = Number($('#chorusMix').val());
			chorusMix.gain.value = Math.cos((1.0 - (patch.chorus_mix *.01)) * 0.5*Math.PI);
			chorusDirect.gain.value = Math.cos((patch.chorus_mix *.01) * 0.5*Math.PI);
			patch["chorus_rate"] = Number($('#chorusRate').val());
			chorusLFO.frequency.value = patch.chorus_rate;
			patch["chorus_depth"] = Number($('#chorusDepth').val());
			chorusDepth.gain.value = patch.chorus_depth *.01 + (patch.chorus_delay / 1000);
			patch["chorus_delay"] = Number($('#chorusDelay').val());
			chorusDelayLeft.delayTime.value = patch.chorus_delay / 1000;
			chorusDelayRight.delayTime.value = patch.chorus_delay / 1000;
			if($('#chorusInvertSwitch').parent().hasClass('on')){
				patch["chorus_invertSwitch"] = 'on';
				chorusInvert.gain.value = -1;
			} else {
				patch["chorus_invertSwitch"] = 'off';
				chorusInvert.gain.value = 1;
			}
			patch["chorus_lc"] = Number($('#chorusLC').val());
			chorusLC.frequency.value = patch.chorus_lc;
		} else {
			patch["chorus_switch"] = 'off';
		}
		
		if($('#tremoloSwitch').parent().hasClass('on')){
			patch["tremolo_switch"] = 'on';
			patch["tremolo_rate"] = Number($('#tremoloRate').val());
			patch["tremolo_rateBPM"] = $('#tremoloRateBPM').val();
			if(patch.tremolo_rateBPM != "off"){
	    		var newFreq = Number(patch.bpm) / Number(patch.tremolo_rateBPM);
	    		patch["tremolo_rate"] = newFreq;
	    	}
			patch["tremolo_mix"] = Number($('#tremoloMix').val());
			tremoloMix.gain.value = Math.cos((1.0 - (patch.tremolo_mix *.01)) * 0.5*Math.PI);
			tremoloDirect.gain.value = Math.cos((patch.tremolo_mix *.01) * 0.5*Math.PI);
			tremoloLFO.frequency.value = patch.tremolo_rate;
			tremoloLFO2.frequency.value = patch.tremolo_rate;
			patch["tremolo_depth"] = Number($('#tremoloDepth').val());
			tremoloDepth.gain.value = patch.tremolo_depth * .01;
			patch["tremolo_shape"] = Number($('#tremoloShape').val());
			tremoloLFOAmp.gain.value = 1 - (patch.tremolo_shape * .01);
			tremoloLFO2Amp.gain.value = patch.tremolo_shape * .01;
			patch["tremolo_stereoWidth"] = Number($('#tremoloStereoWidth').val());
			tremoloLeftLeft.gain.value = (50 + (patch.tremolo_stereoWidth / 2)) * .01;
			tremoloLeftRight.gain.value = (50 - (patch.tremolo_stereoWidth / 2)) * .01;
			tremoloRightRight.gain.value = (50 + (patch.tremolo_stereoWidth / 2)) * .01;
			tremoloRightLeft.gain.value = (50 - (patch.tremolo_stereoWidth / 2)) * .01;
			if($('#tremoloInvertSwitch').parent().hasClass('on')){
				patch["tremolo_invertSwitch"] = 'on';
				tremoloInvert.gain.value = -1;
			} else {
				patch["tremolo_invertSwitch"] = 'off';
				tremoloInvert.gain.value = 1;
			}
		} else {
			patch["tremolo_switch"] = 'off';
		}
				
		if($('#reverb').parent().hasClass('on')){patch["reverb_switch"] = 'on'} else {patch["reverb_switch"] = 'off'};
		if($('#reverbDelaySwitch').parent().hasClass('on')){
			patch["reverbDelaySwitch"] = 'on';
			patch["reverbDelayBPM"] = $('#reverbDelayBPM').val();
			patch["reverbDelay"] = Number($('#reverbDelay').val());
		} else {
			patch["reverbDelaySwitch"] = 'off'
		};
		if($('#reverbEQSwitch').parent().hasClass('on')){patch["reverb_EQswitch"] = 'on'} else {patch["reverb_EQswitch"] = 'off'};
		patch["reverb_type"] = $('#reverbType').val();
		patch["reverb_hc"] = Number($('#reverbHC').val());
		patch["reverb_lc"] = Number($('#reverbLC').val());
		patch["reverb_mix"] = Number($('#reverbMix').val());
		reverbHC.frequency.value = patch.reverb_hc;	
    	reverbLC.frequency.value = patch.reverb_lc;
    	reverbMix.gain.value = Math.cos((1.0 - (patch.reverb_mix *.01)) * 0.5*Math.PI);
	    reverbDirect.gain.value = Math.cos((patch.reverb_mix *.01) * 0.5*Math.PI);
	    
	    if($('#eq').parent().hasClass('on')){patch["eq_switch"] = 'on'} else {patch["eq_switch"] = 'off'};
	    if($('#eqHCSwitch').parent().hasClass('on')){patch["eq_HCswitch"] = 'on'} else {patch["eq_HCswitch"] = 'off'};
	    patch["eq_HC"] = Number($('#eqHC').val());
	    if($('#eqHSSwitch').parent().hasClass('on')){patch["eq_HSswitch"] = 'on'} else {patch["eq_HSswitch"] = 'off'};
	    patch["eq_HSamount"] = Number($('#eqHS').val());
	    if($('#eqP1Switch').parent().hasClass('on')){patch["eq_P1switch"] = 'on'} else {patch["eq_P1switch"] = 'off'};
	    patch["eq_P1amount"] = Number($('#eqP1a').val());
	    patch["eq_P1freq"] = Number($('#eqP1f').val());
	    if($('#eqP2Switch').parent().hasClass('on')){patch["eq_P2switch"] = 'on'} else {patch["eq_P2switch"] = 'off'};
	    patch["eq_P2amount"] = Number($('#eqP2a').val());
	    patch["eq_P2freq"] = Number($('#eqP2f').val());
	    if($('#eqLSSwitch').parent().hasClass('on')){patch["eq_LSswitch"] = 'on'} else {patch["eq_LSswitch"] = 'off'};
	    patch["eq_LSamount"] = Number($('#eqLS').val());
	    if($('#eqLCSwitch').parent().hasClass('on')){patch["eq_LCswitch"] = 'on'} else {patch["eq_LCswitch"] = 'off'};
	    patch["eq_LC"] = Number($('#eqLC').val());
    	
    	if($('#compressor').parent().hasClass('on')){patch["compressor_switch"] = 'on'} else {patch["compressor_switch"] = 'off'};
    	patch["compressor_threshold"] = Number($('#compressorThreshold').val());
    	compressor.threshold.value = patch.compressor_threshold;
    	patch["compressor_ratio"] = Number($('#compressorRatio').val());
    	compressor.ratio.value = patch.compressor_ratio;
    	patch["compressor_makeup"] = ($('#compressorMakeup').val()*.01) + 1;
    	compressorMakeup.gain.value = patch.compressor_makeup;
    	patch["compressor_dry"] = ($('#compressorDry').val()*.01);
    	compressorDry.gain.value = patch.compressor_dry;
    	
    	if($('#delays').parent().hasClass('on')){patch["delays_switch"] = 'on'} else {patch["delays_switch"] = 'off'};
    	
    	if (patch.effects_switch == "on"){

    		effectsInput1.disconnect();
    		effectsInput1.connect(effectsInput2);
    		
    		if (patch.compressor_switch == "on"){
				compressorInput1.disconnect();
    			compressorInput1.connect(compressorInput2);
			} else {
				compressorInput1.disconnect();
				compressorInput1.connect(compressorOutput);
			}
    		
    		if (patch.distortion_switch == "on"){
    			distortionInput1.disconnect();
    			distortionInput1.connect(distortionInput2);
    			
    			if (patch.distortion_EQswitch == "on"){
    				distortionFiltInp1.disconnect();
    				distortionFiltInp1.connect(distortionFiltInp2);
    			} else {
    				distortionFiltInp1.disconnect();
					distortionFiltInp1.connect(distortionLevel);
    			}
    			
    		} else {
    			distortionInput1.disconnect();
				distortionInput1.connect(distortionOutput);
    		}
    		
    		if (patch.delays_switch == "on"){
    		
    			delaysInput1.disconnect();
    			delaysInput1.connect(delaysInput2);
    		
	    		if (patch.delay_switch == "on"){
	    			delayInput1.disconnect();
	    			delayInput1.connect(delayInput2);
	    			
	    			if (patch.delay_EQswitch == "on"){
	    				delayFiltInp1.disconnect();
	    				delayFiltInp1.connect(delayFiltInp2);
	    			} else {
	    				delayFiltInp1.disconnect();
						delayFiltInp1.connect(delayFiltOut);
	    			}
	    			
	    		} else {
	    			delayInput1.disconnect();
					delayInput1.connect(delayOutput);
	    		}
	    		
	    		if (patch.dualDelay_switch == "on"){
	    			ddInput1.disconnect();
	    			ddInput1.connect(ddInput2);
	    			
	    			if(patch.dualDelay_EQswitch == "on"){ 
	    				ddFltInpA.disconnect();
	    				ddFltInpA.connect(ddHCA);
	    				ddFltInpB.disconnect();
	    				ddFltInpB.connect(ddHCB);
	    			} else {
	    				ddFltInpA.disconnect();
	    				ddFltInpA.connect(ddA);
	    				ddFltInpB.disconnect();
	    				ddFltInpB.connect(ddB);
	    			}
	    			
	    			
	    		} else {
	    			ddInput1.disconnect();
					ddInput1.connect(ddOutput);
	    		}
    		
    		} else {
    			delaysInput1.disconnect();
    			delaysInput1.connect(delaysOutput);
    		}
    		
    		if (patch.modulation_switch == "on"){
    			modulationInput1.disconnect();
    			modulationInput1.connect(modulationInput2);
    			if (patch.chorus_switch == "on"){
    				chorusInput1.disconnect();
    				chorusInput1.connect(chorusInput2);
    			} else {
    				chorusInput1.disconnect();
					chorusInput1.connect(chorusOutput);
    			}
    			if (patch.tremolo_switch == "on"){
    				tremoloInput1.disconnect();
    				tremoloInput1.connect(tremoloInput2);
    			} else {
    				tremoloInput1.disconnect();
					tremoloInput1.connect(tremoloOutput);
    			}
    		} else {
    			modulationInput1.disconnect();
				modulationInput1.connect(modulationOutput);
    		}
    		
    		
    		if (patch.reverb_switch == "on"){
    			reverbInput1.disconnect();
    			reverbInput1.connect(reverbInput2);
    			reverbMix.connect(reverbOutput);
    			
	   			 // reverbDelay   reverb delay  reverbDelaySwitch, reverbDelayBPM, reverbDelay
	   			 if (patch.reverbDelaySwitch == "on"){
	   			 	reverbDelay.delayTime.value = patch.reverbDelay;
	   			 } else {
	   			 	reverbDelay.delayTime.value = 0;
	   			 }
    			
    			if (patch.reverb_EQswitch == "on"){
    				convolverL.disconnect();
					convolverL.connect(reverbLC);
					convolverR.disconnect();
					convolverR.connect(reverbLC);
    			} else {
    				convolverL.disconnect();
    				convolverL.connect(reverbMix);
    				convolverR.disconnect();
    				convolverR.connect(reverbMix);
				}
    			
    		} else {
    			reverbMix.disconnect();
    			reverbInput1.disconnect();
				reverbInput1.connect(reverbOutput);
    		}
    		
    		if (patch.eq_switch == "on"){
    			eqInput1.disconnect();
    			eqInput1.connect(eqInput2);
    			
    			if (patch.eq_HCswitch == "on"){
    				eqHCInput1.disconnect();
    				eqHCInput1.connect(eqHCInput2);
    				eqHC.frequency.value = patch.eq_HC;
    			} else {
    				eqHCInput1.disconnect();
					eqHCInput1.connect(eqHCOutput);
    			}
    			
    			if (patch.eq_HSswitch == "on"){
    				eqHSInput1.disconnect();
    				eqHSInput1.connect(eqHSInput2);
    				eqHS.gain.value = patch.eq_HSamount;
    			} else {
    				eqHSInput1.disconnect();
					eqHSInput1.connect(eqHSOutput);
    			}
    			
    			if (patch.eq_P1switch == "on"){
    				eqP1Input1.disconnect();
    				eqP1Input1.connect(eqP1Input2);
    				eqP1.gain.value = patch.eq_P1amount;
    				eqP1.frequency.value = patch.eq_P1freq;
    			} else {
    				eqP1Input1.disconnect();
					eqP1Input1.connect(eqP1Output);
    			}
    			
    			if (patch.eq_P2switch == "on"){
    				eqP2Input1.disconnect();
    				eqP2Input1.connect(eqP2Input2);
    				eqP2.gain.value = patch.eq_P2amount;
    				eqP2.frequency.value = patch.eq_P2freq;
    			} else {
    				eqP2Input1.disconnect();
					eqP2Input1.connect(eqP2Output);
    			}
    			
    			if (patch.eq_LSswitch == "on"){
    				eqLSInput1.disconnect();
    				eqLSInput1.connect(eqLSInput2);
    				eqLS.gain.value = patch.eq_LSamount;
    			} else {
    				eqLSInput1.disconnect();
					eqLSInput1.connect(eqLSOutput);
    			}
    			
    			if (patch.eq_LCswitch == "on"){
    				eqLCInput1.disconnect();
    				eqLCInput1.connect(eqLCInput2);
    				eqLC.frequency.value = patch.eq_LC;
    			} else {
    				eqLCInput1.disconnect();
					eqLCInput1.connect(eqLCOutput);
    			}
    			
    		} else {
    			eqInput1.disconnect();
				eqInput1.connect(eqOutput);
    		}
				
		} else {

			effectsInput1.disconnect();
			effectsInput1.connect(effectsOutput);
			
			delayFB.gain.value = 0;
			ddAFB.gain.value = 0;
			ddBFB.gain.value = 0;
			ddAtoB.gain.value = 0;
			ddBtoA.gain.value = 0;
			
		}
		
		if($('#volume').parent().hasClass('on')){patch["volume_switch"] = 'on'} else {patch["volume_switch"] = 'off'};
		if($('#attenuate').parent().hasClass('on')){patch["attenuate_switch"] = 'on'} else {patch["attenuate_switch"] = 'off'};
		patch["volume_input"] = Number($('#volumeInput').val())*.01;
		volume.gain.value = 1 - (patch.volume_input*-1);
		if($('#limiter').parent().hasClass('on')){patch["limiter_switch"] = 'on'} else {patch["limiter_switch"] = 'off'};
		patch["limiter_threshold"] = Number($('#limiterThreshold').val());
		limiter.threshold.value = patch.limiter_threshold;
		if($('#meters').parent().hasClass('on')){patch["meters_switch"] = 'on'} else {patch["meters_switch"] = 'off'};
		
		if (patch.volume_switch == "on"){
			volumeInput1.disconnect();
    		volumeInput1.connect(volumeInput2);
    		if (patch.attenuate_switch == "on"){
    			attenuateInput1.disconnect();
    			attenuateInput1.connect(attenuateInput2);
    		}else{
    			attenuateInput1.disconnect();
    			attenuateInput1.connect(attenuateOutput);
    		}
    		if (patch.limiter_switch == "on"){
    			limiterInput1.disconnect();
    			limiterInput1.connect(limiterInput2);
    		}else{
    			limiterInput1.disconnect();
    			limiterInput1.connect(limiterOutput);
    		}
      		
      	}else{
      		volumeInput1.disconnect();
			volumeInput1.connect(volumeOutput);
	    }

 	}
 	
 	// --------------------------------- 
 	// -------- PATCH TO HTML ---------- 
 	// --------------------------------- 
 	
 	function patch2HTML(e) {
 	
 		var reverbURL = 'ir/'+patch.reverb_type;
    	setReverbImpulseResponse(reverbURL, "r");
    	
    	var reverbURL = patch.osc1_convolverType;
    	loadOscImpulseResponse(reverbURL, 1);

    	var reverbURL = patch.osc2_convolverType;
    	loadOscImpulseResponse(reverbURL, 2);

    	var reverbURL = patch.osc3_convolverType;
    	loadOscImpulseResponse(reverbURL, 3);
 		
		document.getElementById("patchName").value = patch.patchName;
		document.getElementById("bpm").value = patch.bpm;
		
	    var guiP2HOsc = [
	    	'switch',
	    	'shapeSwitch',
	    	'wave',
	    	// 'noiseFilt',
	    	// 'noiseQ', 
	    	'pulseSwitch',
	    	'pulseWidth',
	    	'pulselSwitch',
	    	'pulselOptions',
	    	'pulselShape',
	    	'pulselSlide',
	    	'pulselBPM',
	    	'pulselFreq',
	    	'pulselAmount',
	    	'pulselEnvSwitch',
	    	'pulselDelaySwitch',
	    	'pulselDelayBPM',
	    	'pulselDelay',
	    	'pulselAttackSwitch',
	    	'pulselAttackBPM',
	    	'pulselAttack',
	    	'pulselReleaseSwitch',
	    	'pulselSustainSwitch',
	    	'pulselReleaseBPM',
	    	'pulselRelease',
	    	'superSwitch',
	    	'superNumber',
	    	'superShift',
	    	'superWidth',
	    	'freqSwitch',
	    	'octave',
	    	'pitchFine',
	    	'pmlSwitch',
	    	'pmlOptions',
	    	'pmlSlide',
	    	'pmlShape',
	    	'pmlBPM',
	    	'pmlFreq',
	    	'pmlAmount',
	    	'pmlEnvSwitch',
	    	'pmlDelaySwitch',
	    	'pmlDelayBPM',
	    	'pmlDelay',
	    	'pmlAttackSwitch',
	    	'pmlAttackBPM',
	    	'pmlAttack',
	    	'pmlReleaseSwitch',
	    	'pmlSustainSwitch',
	    	'pmlReleaseBPM',
	    	'pmlRelease',
	    	'pmeSwitch',
	    	'pmeDelaySwitch',
	    	'pmeDelayBPM',
	    	'pmeDelay',
	    	'pmeAttackSwitch',
	    	'pmeInitial',
	    	'pmeAttackBPM',
	    	'pmeAttack',
	    	'pmeReleaseSwitch',
	    	'pmeSustainSwitch',
	    	'pmeTerminal',
	    	'pmeReleaseBPM',
	    	'pmeRelease',
	    	'freqFltSwitch',
	    	'freqFltType',
	    	'freqFltQ',
	    	'freqFltMix',
	    	'ampSwitch',
	    	'Amp',
	    	'amlSwitch',
	    	'amlOptions',
	    	'amlShape',
	    	'amlSlide',
	    	'amlBPM',
	    	'amlFreq',
	    	'amlAmount',
	    	'amlEnvSwitch',
	    	'amlDelaySwitch',
	    	'amlDelayBPM',
	    	'amlDelay',
	    	'amlAttackSwitch',
	    	'amlAttackBPM',
	    	'amlAttack',
	    	'amlReleaseSwitch',
	    	'amlSustainSwitch',
	    	'amlReleaseBPM',
	    	'amlRelease',
	    	'ameSwitch',
	    	'ameDelaySwitch',
	    	'ameDelayBPM',
	    	'ameDelay',
	    	'ameAttackSwitch',
	    	'ameAttackBPM',
	    	'ameAttack',
	    	'ameReleaseSwitch',
	    	'ameSustainSwitch',
	    	'ameReleaseBPM',
	    	'ameRelease',
	    	'panSwitch',
	    	'pan',
	    	'panAutoSwitch',
	    	'panAutoRate',
	    	'panAutoDepth',
	    	'convolverSwitch',
	    	'convolverType',
	    	'convolverGain',
	    	'convolverMix',
	    	'eqSwitch',
	    	'eqHCSwitch',
	    	'eqHC',
	    	'eqPSwitch',
	    	'eqPa',
	    	'eqPf',
	    	'eqLCSwitch',
	    	'eqLC'
    	];
				    					
		for (var oscN = 0; oscN < 3; oscN++) {
			for (var i = 0; i < guiP2HOsc.length; i++) {
				var oscX = 'osc'+(oscN+1);
				var oscY = guiP2HOsc[i];
				var x = oscX + '_' + oscY;
				var y = guiTotal[oscX][oscY];
				guiP2HFN(x,y);
			}
		}
		
		function guiP2HFN(x,y){
									
	    	var slide = '#' + x;
	    	if(y.classList.contains('onOff')){
		    	if (patch[x] == 'on'){
		    		y.classList.add('on');
		    		$(slide).next().slideDown();
		    	} else {
		    		y.classList.remove('on');
		    		$(slide).next().slideUp();
		    	}
	    	} else if(y.classList.contains('parameter')){
	    		y.value = patch[x];
	    		if (y.nextElementSibling.nextElementSibling.classList.contains('log')){
	    			var lo = y.nextElementSibling.nextElementSibling.getAttribute("data-lo");
	    			var hi = y.nextElementSibling.nextElementSibling.getAttribute("data-hi");
	    			var dataResult = valueToLogSlide(lo, hi, patch[x]);
	    			y.nextElementSibling.nextElementSibling.value = dataResult;
	    		} else {
	    			y.nextElementSibling.nextElementSibling.value = patch[x];
	    		}
	    	} else if(y.classList.contains('settings')) {
	    		y.value = patch[x];
	    		var slideID = '.' + x + 'Extended';
	    		if (patch[x] == 'basic'){
					$(slideID).slideUp();
	    		} else {
	    			$(slideID).slideDown();
	    		}
	    	} else {
	    		y.value = patch[x];
	    	}
		}
		
	    
		
		// ODD BALLS, HARD TO REFACTORâ€¦ NEEDS MORE THINKING, PROBABLY FIX WITH GUI UPDATE
		
		
		if (patch.osc1_pulselShape == 'rnd') {
 			$('#osc1_pulselrnd').slideDown();
 		} else {
 			$('#osc1_pulselrnd').slideUp();
 		}
 		if (patch.osc1_pmlShape == 'rnd') {
 			$('#osc1_pmlrnd').slideDown();
 		} else {
 			$('#osc1_pmlrnd').slideUp();
 		}
		if (patch.osc1_amlShape == 'rnd') {
 			$('#osc1_amlrnd').slideDown();
 		} else {
 			$('#osc1_amlrnd').slideUp();
 		}
 		
 		if (patch.osc2_pulselShape == 'rnd') {
 			$('#osc2_pulselrnd').slideDown();
 		} else {
 			$('#osc2_pulselrnd').slideUp();
 		}
		if (patch.osc2_pmlShape == 'rnd') {
 			$('#osc2_pmlrnd').slideDown();
 		} else {
 			$('#osc2_pmlrnd').slideUp();
 		}
		if (patch.osc2_amlShape == 'rnd') {
 			$('#osc2_amlrnd').slideDown();
 		} else {
 			$('#osc2_amlrnd').slideUp();
 		}
 		
 		if (patch.osc3_pulselShape == 'rnd') {
 			$('#osc3_pulselrnd').slideDown();
 		} else {
 			$('#osc3_pulselrnd').slideUp();
 		}
		if (patch.osc3_pmlShape == 'rnd') {
 			$('#osc3_pmlrnd').slideDown();
 		} else {
 			$('#osc3_pmlrnd').slideUp();
 		}
		if (patch.osc3_amlShape == 'rnd') {
 			$('#osc3_amlrnd').slideDown();
 		} else {
 			$('#osc3_amlrnd').slideUp();
 		}
 				 		
 		if (patch.osc1_wave == 'nw' || patch.osc1_wave == 'np' || patch.osc1_wave == 'nb'){		
			$('#osc1_superContainer').slideUp();
		}else{
			$('#osc1_superContainer').slideDown();
		}
		if (patch.osc2_wave == 'nw' || patch.osc2_wave == 'np' || patch.osc2_wave == 'nb'){		
			$('#osc2_superContainer').slideUp();
		}else{
			$('#osc2_superContainer').slideDown();
		}
		if (patch.osc3_wave == 'nw' || patch.osc3_wave == 'np' || patch.osc3_wave == 'nb'){		
			$('#osc3_superContainer').slideUp();
		}else{
			$('#osc3_superContainer').slideDown();
		}
		
		if (patch.osc1_wave == 'square'){		
			$('#osc1_pulseContainer').slideDown();
		}else{
			$('#osc1_pulseContainer').slideUp();
		}
		if (patch.osc1_wave == 'square' && patch.osc1_pulseSwitch == 'on'){		
			$('#osc1_superContainer').slideUp();
		}else{
			$('#osc1_superContainer').slideDown();
		}
		
		if (patch.osc2_wave == 'square'){		
			$('#osc2_pulseContainer').slideDown();
		}else{
			$('#osc2_pulseContainer').slideUp();
		}
		if (patch.osc2_wave == 'square' && patch.osc2_pulseSwitch == 'on'){		
			$('#osc2_superContainer').slideUp();
		}else{
			$('#osc2_superContainer').slideDown();
		}
		
		if (patch.osc3_wave == 'square'){		
			$('#osc3_pulseContainer').slideDown();
		}else{
			$('#osc3_pulseContainer').slideUp();
		}
		if (patch.osc3_wave == 'square' && patch.osc3_pulseSwitch == 'on'){		
			$('#osc3_superContainer').slideUp();
		}else{
			$('#osc3_superContainer').slideDown();
		}

 		
 		if (patch.bpm_switch == 'on'){
 			$('#bpm_switch').addClass('on');
 			$('.bpmPart').slideDown("slow");
 			$('#bpm_switch').next().slideDown();
 		} else {
 			$('#bpm_switch').removeClass('on');
 			$('.bpmPart').slideUp("slow");
 			$('#bpm_switch').next().slideUp();
 		}
 		
 		
		var guiP2HFlt = [
			['flts_switch', 'flts'],
		];
		
		/*
		for (var i = 0; i < guiP2HFlt.length; i++) {
			var oscX = 'osc'+(oscN+1);
			var oscY = guiP2HOsc[i];
			var x = oscX + '_' + oscY;
			var y = guiTotal[oscX][oscY];
			guiP2HFN(x,y);
		}
		*/
		
		
 		if (patch.flts_switch == 'on'){
 			$('#flts').parent().addClass('on');
 			$('#flts').parent().next().slideDown();
 		}else{
 			$('#flts').parent().removeClass('on');
 			$('#flts').parent().next().slideUp();
 		}
 		
 		if (patch.fltMtx_switch == 'on'){
 			$('#fltMtx').parent().addClass('on');
 			$('#fltMtx').parent().next().slideDown();
 		}else{
 			$('#fltMtx').parent().removeClass('on');
 			$('#fltMtx').parent().next().slideUp();
 		}
 		$('#fltMtxPre').val(patch.fltMtx_preset);
 		$('#fltMtxo2f1').val(patch.fltMtx_oscsToF1);
 		$('#fltMtxo2f1').next().next().val(patch.fltMtx_oscsToF1);
 		$('#fltMtxo2f2').val(patch.fltMtx_oscsToF2);
 		$('#fltMtxo2f2').next().next().val(patch.fltMtx_oscsToF2);
 		$('#fltMtxo2ve').val(patch.fltMtx_oscsToVE);
 		$('#fltMtxo2ve').next().next().val(patch.fltMtx_oscsToVE);
 		$('#fltMtxf12f2').val(patch.fltMtx_F1ToF2);
 		$('#fltMtxf12f2').next().next().val(patch.fltMtx_F1ToF2);
 		$('#fltMtxf12ve').val(patch.fltMtx_F1ToVE);
 		$('#fltMtxf12ve').next().next().val(patch.fltMtx_F1ToVE);
 		$('#fltMtxf22ve').val(patch.fltMtx_F2ToVE);
 		$('#fltMtxf22ve').next().next().val(patch.fltMtx_F2ToVE);
 		
 		if (patch.flt1_switch == 'on'){
 			$('#flt1').parent().addClass('on');
 			$('#flt1').parent().next().slideDown();
 		}else{
 			$('#flt1').parent().removeClass('on');
 			$('#flt1').parent().next().slideUp();
 		}
 		$('#flt1type').val(patch.flt1_type);
 		$('#flt1cut').val(patch.flt1_cutoff);
		
		var dataResult = valueToLogSlide(20,20000,patch.flt1_cutoff);
		$('#flt1cut').next().next().val(dataResult);
		
		if (patch.flt1followSwitch == 'on'){
 			$('#flt1followSwitch').parent().addClass('on');
 			$('#flt1followSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1followSwitch').parent().removeClass('on');
 			$('#flt1followSwitch').parent().next().slideUp();
 		}
 		$('#flt1follow').val(patch.flt1follow);
 		$('#flt1follow').next().next().val(patch.flt1follow);

 		
 		if (patch.flt1_lSwitch == 'on'){
 			$('#flt1lSwitch').parent().addClass('on');
 			$('#flt1lSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1lSwitch').parent().removeClass('on');
 			$('#flt1lSwitch').parent().next().slideUp();
 		}
 		$('#flt1lOptions').val(patch.flt1_lOptions);
 		if (patch.flt1_lOptions == "basic"){
    		$('.flt1lOptionsExtended').slideUp();
    	} else {
    		$('.flt1lOptionsExtended').slideDown();
    	}
 		$('#flt1lShape').val(patch.flt1_lShape)
 		$('#flt1lSlide').val(patch.flt1_lSlide);
		$('#flt1lSlide').next().next().val(patch.flt1_lSlide);
 		
 		$('#flt1lDelay').val(patch.flt1_lDelay);
		$('#flt1lDelay').next().next().val(patch.flt1_lDelay);
		$('#flt1lBPM').val(patch.flt1_lBPM);
		$('#flt1lFreq').val(patch.flt1_lFreq);
		var dataResult = valueToLogSlide(.1,20,patch.flt1_lFreq);
		$('#flt1lFreq').next().next().val(dataResult);
 		$('#flt1lAmount').val(patch.flt1_lAmount);
		$('#flt1lAmount').next().next().val(patch.flt1_lAmount);
		if (patch.flt1_lEnvSwitch == 'on'){
 			$('#flt1lEnvSwitch').parent().addClass('on');
 			$('#flt1lEnvSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1lEnvSwitch').parent().removeClass('on');
 			$('#flt1lEnvSwitch').parent().next().slideUp();
 		}
 		if (patch.flt1_lDelaySwitch == 'on'){
 			$('#flt1lDelaySwitch').parent().addClass('on');
 			$('#flt1lDelaySwitch').parent().next().slideDown();
 		}else{
 			$('#flt1lDelaySwitch').parent().removeClass('on');
 			$('#flt1lDelaySwitch').parent().next().slideUp();
 		}
 		$('#flt1lDelayBPM').val(patch.flt1_lDelayBPM);
 		$('#flt1lDelay').val(patch.flt1_lDelay);
 		$('#flt1lDelay').next().next().val(patch.flt1_lDelay);
 		if (patch.flt1_lAttackSwitch == 'on'){
 			$('#flt1lAttackSwitch').parent().addClass('on');
 			$('#flt1lAttackSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1lAttackSwitch').parent().removeClass('on');
 			$('#flt1lAttackSwitch').parent().next().slideUp();
 		}
 		$('#flt1lAttackBPM').val(patch.flt1_lAttackBPM);
 		$('#flt1lAttack').val(patch.flt1_lAttack);
 		$('#flt1lAttack').next().next().val(patch.flt1_lAttack);
 		if (patch.flt1_lReleaseSwitch == 'on'){
 			$('#flt1lReleaseSwitch').parent().addClass('on');
 			$('#flt1lReleaseSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1lReleaseSwitch').parent().removeClass('on');
 			$('#flt1lReleaseSwitch').parent().next().slideUp();
 		}
		if (patch.flt1_lSustainSwitch == 'on'){
 			$('#flt1lSustainSwitch').parent().addClass('on');
 		}else{
 			$('#flt1lSustainSwitch').parent().removeClass('on');
 		}
 		$('#flt1lReleaseBPM').val(patch.flt1_lReleaseBPM);
 		$('#flt1lRelease').val(patch.flt1_lRelease);
 		$('#flt1lRelease').next().next().val(patch.flt1_lRelease);
 		
		if (patch.flt1_eSwitch == 'on'){
 			$('#flt1eSwitch').parent().addClass('on');
 			$('#flt1eSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1eSwitch').parent().removeClass('on');
 			$('#flt1eSwitch').parent().next().slideUp();
 		}
 		if (patch.flt1_eAttackSwitch == 'on'){
 			$('#flt1eAttackSwitch').parent().addClass('on');
 			$('#flt1eAttackSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1eAttackSwitch').parent().removeClass('on');
 			$('#flt1eAttackSwitch').parent().next().slideUp();
 		}
 		if (patch.flt1_eReleaseSwitch == 'on'){
 			$('#flt1eReleaseSwitch').parent().addClass('on');
 			$('#flt1eReleaseSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1eReleaseSwitch').parent().removeClass('on');
 			$('#flt1eReleaseSwitch').parent().next().slideUp();
 		}
 		$('#flt1eStart').val(patch.flt1_eInitial);
 		var dataResult = valueToLogSlide(20,20000,patch.flt1_eInitial);
		$('#flt1eStart').next().next().val(dataResult);
		$('#flt1eAttackBPM').val(patch.flt1_eAttackBPM);
 		$('#flt1eAttack').val(patch.flt1_eAttack);
 		$('#flt1eAttack').next().next().val(patch.flt1_eAttack);
 		if (patch.flt1_eSustainSwitch == 'on'){
 			$('#flt1eSustainSwitch').parent().addClass('on');
 			$('#flt1eSustainSwitch').parent().next().slideDown();
 		}else{
 			$('#flt1eSustainSwitch').parent().removeClass('on');
 			$('#flt1eSustainSwitch').parent().next().slideUp();
 		}
 		$('#flt1eReleaseBPM').val(patch.flt1_eReleaseBPM);
 		$('#flt1eRelease').val(patch.flt1_eRelease);
 		$('#flt1eRelease').next().next().val(patch.flt1_eRelease);
 		$('#flt1eEnd').val(patch.flt1_eTerminal);
 		var dataResult = valueToLogSlide(20,20000,patch.flt1_eTerminal);
 		$('#flt1eEnd').next().next().val(dataResult);
 		$('#flt1res').val(patch.flt1_q);
 		$('#flt1res').next().next().val(patch.flt1_q);
 		
 		if (patch.flt2_switch == 'on'){
 			$('#flt2').parent().addClass('on');
 			$('#flt2').parent().next().slideDown();
 		}else{
 			$('#flt2').parent().removeClass('on');
 			$('#flt2').parent().next().slideUp();
 		}
 		$('#flt2type').val(patch.flt2_type);
 		$('#flt2cut').val(patch.flt2_cutoff);
		
		var dataResult = valueToLogSlide(20,20000,patch.flt2_cutoff);
		$('#flt2cut').next().next().val(dataResult);
		
		if (patch.flt2followSwitch == 'on'){
 			$('#flt2followSwitch').parent().addClass('on');
 			$('#flt2followSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2followSwitch').parent().removeClass('on');
 			$('#flt2followSwitch').parent().next().slideUp();
 		}
 		$('#flt2follow').val(patch.flt2follow);
 		$('#flt2follow').next().next().val(patch.flt2follow);
 		
 		if (patch.flt2_lSwitch == 'on'){
 			$('#flt2lSwitch').parent().addClass('on');
 			$('#flt2lSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2lSwitch').parent().removeClass('on');
 			$('#flt2lSwitch').parent().next().slideUp();
 		}
 		$('#flt2lOptions').val(patch.flt2_lOptions);
 		if (patch.flt2_lOptions == "basic"){
    		$('.flt2lOptionsExtended').slideUp();
    	} else {
    		$('.flt2lOptionsExtended').slideDown();
    	}
 		$('#flt2lShape').val(patch.flt2_lShape)
 		$('#flt2lSlide').val(patch.flt2_lSlide);
		$('#flt2lSlide').next().next().val(patch.flt2_lSlide);
 		
 		$('#flt2lDelay').val(patch.flt2_lDelay);
		$('#flt2lDelay').next().next().val(patch.flt2_lDelay);
		$('#flt2lBPM').val(patch.flt2_lBPM);
		$('#flt2lFreq').val(patch.flt2_lFreq);
		var dataResult = valueToLogSlide(.1,20,patch.flt2_lFreq);
		$('#flt2lFreq').next().next().val(dataResult);
 		$('#flt2lAmount').val(patch.flt2_lAmount);
		$('#flt2lAmount').next().next().val(patch.flt2_lAmount);
		if (patch.flt2_lEnvSwitch == 'on'){
 			$('#flt2lEnvSwitch').parent().addClass('on');
 			$('#flt2lEnvSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2lEnvSwitch').parent().removeClass('on');
 			$('#flt2lEnvSwitch').parent().next().slideUp();
 		}
 		if (patch.flt2_lDelaySwitch == 'on'){
 			$('#flt2lDelaySwitch').parent().addClass('on');
 			$('#flt2lDelaySwitch').parent().next().slideDown();
 		}else{
 			$('#flt2lDelaySwitch').parent().removeClass('on');
 			$('#flt2lDelaySwitch').parent().next().slideUp();
 		}
 		$('#flt2lDelayBPM').val(patch.flt2_lDelayBPM);
 		$('#flt2lDelay').val(patch.flt2_lDelay);
 		$('#flt2lDelay').next().next().val(patch.flt2_lDelay);
 		if (patch.flt2_lAttackSwitch == 'on'){
 			$('#flt2lAttackSwitch').parent().addClass('on');
 			$('#flt2lAttackSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2lAttackSwitch').parent().removeClass('on');
 			$('#flt2lAttackSwitch').parent().next().slideUp();
 		}
 		$('#flt2lAttackBPM').val(patch.flt2_lAttackBPM);
 		$('#flt2lAttack').val(patch.flt2_lAttack);
 		$('#flt2lAttack').next().next().val(patch.flt2_lAttack);
 		if (patch.flt2_lReleaseSwitch == 'on'){
 			$('#flt2lReleaseSwitch').parent().addClass('on');
 			$('#flt2lReleaseSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2lReleaseSwitch').parent().removeClass('on');
 			$('#flt2lReleaseSwitch').parent().next().slideUp();
 		}
		if (patch.flt2_lSustainSwitch == 'on'){
 			$('#flt2lSustainSwitch').parent().addClass('on');
 		}else{
 			$('#flt2lSustainSwitch').parent().removeClass('on');
 		}
 		$('#flt2lReleaseBPM').val(patch.flt2_lReleaseBPM);
 		$('#flt2lRelease').val(patch.flt2_lRelease);
 		$('#flt2lRelease').next().next().val(patch.flt2_lRelease);
 		
		if (patch.flt2_eSwitch == 'on'){
 			$('#flt2eSwitch').parent().addClass('on');
 			$('#flt2eSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2eSwitch').parent().removeClass('on');
 			$('#flt2eSwitch').parent().next().slideUp();
 		}
 		if (patch.flt2_eAttackSwitch == 'on'){
 			$('#flt2eAttackSwitch').parent().addClass('on');
 			$('#flt2eAttackSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2eAttackSwitch').parent().removeClass('on');
 			$('#flt2eAttackSwitch').parent().next().slideUp();
 		}
 		if (patch.flt2_eReleaseSwitch == 'on'){
 			$('#flt2eReleaseSwitch').parent().addClass('on');
 			$('#flt2eReleaseSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2eReleaseSwitch').parent().removeClass('on');
 			$('#flt2eReleaseSwitch').parent().next().slideUp();
 		}
 		$('#flt2eStart').val(patch.flt2_eInitial);
 		var dataResult = valueToLogSlide(20,20000,patch.flt2_eInitial);
		$('#flt2eStart').next().next().val(dataResult);
		$('#flt2eAttackBPM').val(patch.flt2_eAttackBPM);
 		$('#flt2eAttack').val(patch.flt2_eAttack);
 		$('#flt2eAttack').next().next().val(patch.flt2_eAttack);
 		if (patch.flt2_eSustainSwitch == 'on'){
 			$('#flt2eSustainSwitch').parent().addClass('on');
 			$('#flt2eSustainSwitch').parent().next().slideDown();
 		}else{
 			$('#flt2eSustainSwitch').parent().removeClass('on');
 			$('#flt2eSustainSwitch').parent().next().slideUp();
 		}
 		$('#flt2eReleaseBPM').val(patch.flt2_eReleaseBPM);
 		$('#flt2eRelease').val(patch.flt2_eRelease);
 		$('#flt2eRelease').next().next().val(patch.flt2_eRelease);
 		$('#flt2eEnd').val(patch.flt2_eTerminal);
 		var dataResult = valueToLogSlide(20,20000,patch.flt2_eTerminal);
 		$('#flt2eEnd').next().next().val(dataResult);
 		$('#flt2res').val(patch.flt2_q);
 		$('#flt2res').next().next().val(patch.flt2_q);
 		
 		// AMPLITUDE ENVELOPE
 		
 		if (patch.ae_switch == 'on'){
 			$('#ampEnv').parent().addClass('on');
 			$('#ampEnv').parent().next().slideDown();
 		}else{
 			$('#ampEnv').parent().removeClass('on');
 			$('#ampEnv').parent().next().slideUp();
 		}
 		$('#aeOptions').val(patch.ae_options);
 		if (patch.ae_options == 'basic'){
    		$('.aeOptionsBasic').slideDown();
    		$('.aeOptionsExtended').slideUp();
    	} else {
    		$('.aeOptionsBasic').slideUp();
    		$('.aeOptionsExtended').slideDown();
    	}
    	
 		if (patch.ae_attackSwitch == 'on'){
 			$('#ampEnvAttackSwitch').parent().addClass('on');
 			$('#ampEnvAttackSwitch').parent().next().slideDown();
 		}else{
 			$('#ampEnvAttackSwitch').parent().removeClass('on');
 			$('#ampEnvAttackSwitch').parent().next().slideUp();
 		}
    	
    	$('#ampEnvAttackTimeBPM').val(patch.ae_attackTimeBPM);
    	$('#ampEnvAttackTime').val(patch.ae_attackTime);
 		$('#ampEnvAttackTime').next().next().val(patch.ae_attackTime);
 		if (patch.ae_attackPart1Switch == 'on'){
 			$('#ampEnvAttackPart1Switch').parent().addClass('on');
 			$('#ampEnvAttackPart1Switch').parent().next().slideDown();
 		}else{
 			$('#ampEnvAttackPart1Switch').parent().removeClass('on');
 			$('#ampEnvAttackPart1Switch').parent().next().slideUp();
 		}
 		$('#ampEnvAttackPart1TimeBPM').val(patch.ae_attackPart1TimeBPM);
 		$('#ampEnvAttackPart1Time').val(patch.ae_attackPart1Time);
 		$('#ampEnvAttackPart1Time').next().next().val(patch.ae_attackPart1Time);
 		$('#ampEnvAttackPart1Level').val(patch.ae_attackPart1Level);
 		$('#ampEnvAttackPart1Level').next().next().val(patch.ae_attackPart1Level);
 		if (patch.ae_attackPart2Switch == 'on'){
 			$('#ampEnvAttackPart2Switch').parent().addClass('on');
 			$('#ampEnvAttackPart2Switch').parent().next().slideDown();
 		}else{
 			$('#ampEnvAttackPart2Switch').parent().removeClass('on');
 			$('#ampEnvAttackPart2Switch').parent().next().slideUp();
 		}
 		$('#ampEnvAttackPart2TimeBPM').val(patch.ae_attackPart2TimeBPM);
 		$('#ampEnvAttackPart2Time').val(patch.ae_attackPart2Time);
 		$('#ampEnvAttackPart2Time').next().next().val(patch.ae_attackPart2Time);
 		$('#ampEnvAttackPart2Level').val(patch.ae_attackPart2Level);
 		$('#ampEnvAttackPart2Level').next().next().val(patch.ae_attackPart2Level);
 		if (patch.ae_decaySwitch == 'on'){
 			$('#ampEnvDecaySwitch').parent().addClass('on');
 			$('#ampEnvDecaySwitch').parent().next().slideDown();
 		}else{
 			$('#ampEnvDecaySwitch').parent().removeClass('on');
 			$('#ampEnvDecaySwitch').parent().next().slideUp();
 		}
 		$('#ampEnvDecayTimeBPM').val(patch.ae_decayTimeBPM);
 		$('#ampEnvDecay').val(patch.ae_decayTime);
 		$('#ampEnvDecay').next().next().val(patch.ae_decayTime);
 		$('#ampEnvDecayLevel').val(patch.ae_decayLevel);
 		$('#ampEnvDecayLevel').next().next().val(patch.ae_decayLevel);
 		if (patch.ae_sustainSwitch == 'on'){
 			$('#ampEnvSustainSwitch').parent().addClass('on');
 			$('#ampEnvSustainSwitch').parent().next().slideDown();
 		}else{
 			$('#ampEnvSustainSwitch').parent().removeClass('on');
 			$('#ampEnvSustainSwitch').parent().next().slideUp();
 		}
 		if (patch.ae_sustainMaxSwitch == 'on'){
 			$('#ampEnvSustainSwitchMax').parent().addClass('on');
 			$('#ampEnvSustainSwitchMax').parent().next().slideDown();
 		}else{
 			$('#ampEnvSustainSwitchMax').parent().removeClass('on');
 			$('#ampEnvSustainSwitchMax').parent().next().slideUp();
 		}
 		$('#ampEnvSustainMaxTimeBPM').val(patch.ae_sustainTimeBPM);
 		$('#ampEnvSustainTimeMax').val(patch.ae_sustainMaxTime);
 		$('#ampEnvSustainTimeMax').next().next().val(patch.ae_sustainMaxTime);
 		if (patch.ae_holdSwitch == 'on'){
 			$('#ampEnvHoldSwitch').parent().addClass('on');
 			$('#ampEnvHoldSwitch').parent().next().slideDown();
 		}else{
 			$('#ampEnvHoldSwitch').parent().removeClass('on');
 			$('#ampEnvHoldSwitch').parent().next().slideUp();
 		}
 		$('#ampEnvHoldBPM').val(patch.ae_holdTimeBPM);
 		$('#ampEnvHold').val(patch.ae_holdTime);
 		$('#ampEnvHold').next().next().val(patch.ae_holdTime);
 		if (patch.ae_releaseSwitch == 'on'){
 			$('#ampEnvReleaseSwitch').parent().addClass('on');
 			$('#ampEnvReleaseSwitch').parent().next().slideDown();
 		}else{
 			$('#ampEnvReleaseSwitch').parent().removeClass('on');
 			$('#ampEnvReleaseSwitch').parent().next().slideUp();
 		}

    	$('#ampEnvReleaseTimeBPM').val(patch.ae_releaseTimeBPM);
    	$('#ampEnvReleaseTime').val(patch.ae_releaseTime);
 		$('#ampEnvReleaseTime').next().next().val(patch.ae_releaseTime);
 		if (patch.ae_releasePart1Switch == 'on'){
 			$('#ampEnvReleasePart1Switch').parent().addClass('on');
 			$('#ampEnvReleasePart1Switch').parent().next().slideDown();
 		}else{
 			$('#ampEnvReleasePart1Switch').parent().removeClass('on');
 			$('#ampEnvReleasePart1Switch').parent().next().slideUp();
 		}
 		$('#ampEnvReleasePart1TimeBPM').val(patch.ae_releasePart1TimeBPM);
 		$('#ampEnvReleasePart1Time').val(patch.ae_releasePart1Time);
 		$('#ampEnvReleasePart1Time').next().next().val(patch.ae_releasePart1Time);
 		$('#ampEnvReleasePart1Level').val(patch.ae_releasePart1Level);
 		$('#ampEnvReleasePart1Level').next().next().val(patch.ae_releasePart1Level);
 		if (patch.ae_releasePart2Switch == 'on'){
 			$('#ampEnvReleasePart2Switch').parent().addClass('on');
 			$('#ampEnvReleasePart2Switch').parent().next().slideDown();
 		}else{
 			$('#ampEnvReleasePart2Switch').parent().removeClass('on');
 			$('#ampEnvReleasePart2Switch').parent().next().slideUp();
 		}
 		$('#ampEnvReleasePart2TimeBPM').val(patch.ae_releasePart2TimeBPM);
 		$('#ampEnvReleasePart2Time').val(patch.ae_releasePart2Time);
 		$('#ampEnvReleasePart2Time').next().next().val(patch.ae_releasePart2Time);
 		$('#ampEnvReleasePart2Level').val(patch.ae_releasePart2Level);
 		$('#ampEnvReleasePart2Level').next().next().val(patch.ae_releasePart2Level);
 		if (patch.ae_releasePart3Switch == 'on'){
 			$('#ampEnvReleasePart3Switch').parent().addClass('on');
 			$('#ampEnvReleasePart3Switch').parent().next().slideDown();
 		}else{
 			$('#ampEnvReleasePart3Switch').parent().removeClass('on');
 			$('#ampEnvReleasePart3Switch').parent().next().slideUp();
 		}
 		$('#ampEnvReleasePart3TimeBPM').val(patch.ae_releasePart3TimeBPM);
 		$('#ampEnvReleasePart3Time').val(patch.ae_releasePart3Time);
 		$('#ampEnvReleasePart3Time').next().next().val(patch.ae_releasePart3Time);
 		
 		// EFFECTS
 		
 		if (patch.effects_switch == 'on'){
 			$('#effects').parent().addClass('on');
 			$('#effects').parent().next().slideDown();
 		}else{
 			$('#effects').parent().removeClass('on');
 			$('#effects').parent().next().slideUp();
 		}
 		
 		if (patch.distortion_switch == 'on'){
 			$('#distortion').parent().addClass('on');
 			$('#distortion').parent().next().slideDown();
 		}else{
 			$('#distortion').parent().removeClass('on');
 			$('#distortion').parent().next().slideUp();
 		}
 		$('#distortionCurve').val(patch.distortion_curve);
 		$('#distortionCurve').next().next().val(patch.distortion_curve);
 		if (patch.distortion_EQswitch == 'on'){
 			$('#distortionEQSwitch').parent().addClass('on');
 			$('#distortionEQSwitch').parent().next().slideDown();
 		}else{
 			$('#distortionEQSwitch').parent().removeClass('on');
 			$('#distortionEQSwitch').parent().next().slideUp();
 		}
 		$('#distortionHC').val(patch.distortion_hc);
 		var dataResult = valueToLogSlide(20,20000,patch.distortion_hc);
 		$('#distortionHC').next().next().val(dataResult);
 		$('#distortionLC').val(patch.distortion_lc);
 		var dataResult = valueToLogSlide(20,20000,patch.distortion_lc);
 		$('#distortionLC').next().next().val(dataResult);
 		$('#distortionHCQ').val(patch.distortion_hcQ);
 		$('#distortionHCQ').next().next().val(patch.distortion_hcQ);
 		$('#distortionLCQ').val(patch.distortion_lcQ);
 		$('#distortionLCQ').next().next().val(patch.distortion_lcQ);
 		$('#distortionLevel').val(patch.distortion_level);
 		$('#distortionLevel').next().next().val(patch.distortion_level);
 		$('#distortionMix').val(patch.distortion_mix);
 		$('#distortionMix').next().next().val(patch.distortion_mix);
 		
	    if (patch.delays_switch == 'on'){
 			$('#delays').parent().addClass('on');
 			$('#delays').parent().next().slideDown();
 		}else{
 			$('#delays').parent().removeClass('on');
 			$('#delays').parent().next().slideUp();
 		}

		if (patch.delay_switch == 'on'){
 			$('#delay').parent().addClass('on');
 			$('#delay').parent().next().slideDown();
 		}else{
 			$('#delay').parent().removeClass('on');
 			$('#delay').parent().next().slideUp();
 		}
 		$('#delayTimeBPM').val(patch.delay_timeBPM);
 		$('#delayTime').val(patch.delay_time);
 		$('#delayTime').next().next().val(patch.delay_time);
 		$('#delayFeedback').val(patch.delay_fb);
 		$('#delayFeedback').next().next().val(patch.delay_fb);
 		if (patch.delay_EQswitch == 'on'){
 			$('#delayEQSwitch').parent().addClass('on');
 			$('#delayEQSwitch').parent().next().slideDown();
 		}else{
 			$('#delayEQSwitch').parent().removeClass('on');
 			$('#delayEQSwitch').parent().next().slideUp();
 		}
 		$('#delayHC').val(patch.delay_hc);
 		var dataResult = valueToLogSlide(20,20000,patch.delay_hc);
 		$('#delayHC').next().next().val(dataResult);
 		$('#delayLC').val(patch.delay_lc);
 		var dataResult = valueToLogSlide(20,20000,patch.delay_lc);
 		$('#delayLC').next().next().val(dataResult);
 		$('#delayMix').val(patch.delay_mix);
 		$('#delayMix').next().next().val(patch.delay_mix);
 		 		
 		if (patch.dualDelay_switch == 'on'){
 			$('#dualDelay').parent().addClass('on');
 			$('#dualDelay').parent().next().slideDown();
 		}else{
 			$('#dualDelay').parent().removeClass('on');
 			$('#dualDelay').parent().next().slideUp();
 		}
 		$('#ddInputA').val(patch.dualDelay_InputA);
 		$('#ddInputA').next().next().val(patch.dualDelay_InputA);
 		$('#ddTimeABPM').val(patch.dualDelay_TimeABPM);
 		$('#ddTimeA').val(patch.dualDelay_TimeA);
 		$('#ddTimeA').next().next().val(patch.dualDelay_TimeA);
 		$('#ddFeedbackA').val(patch.dualDelay_fbA);
 		$('#ddFeedbackA').next().next().val(patch.dualDelay_fbA);
 		$('#ddAtoB').val(patch.dualDelay_AtoB);
 		$('#ddAtoB').next().next().val(patch.dualDelay_AtoB);
 		$('#ddPanA').val(patch.dualDelay_PanA);
 		$('#ddPanA').next().next().val(patch.dualDelay_PanA);
 		$('#ddAtoOut').val(patch.dualDelay_AtoOut);
 		$('#ddAtoOut').next().next().val(patch.dualDelay_AtoOut);
 		$('#ddInputB').val(patch.dualDelay_InputB);
 		$('#ddInputB').next().next().val(patch.dualDelay_InputB);
 		$('#ddTimeBBPM').val(patch.dualDelay_TimeBBPM);
 		$('#ddTimeB').val(patch.dualDelay_TimeB);
 		$('#ddTimeB').next().next().val(patch.dualDelay_TimeB);
 		$('#ddFeedbackB').val(patch.dualDelay_fbB);
 		$('#ddFeedbackB').next().next().val(patch.dualDelay_fbB);
 		$('#ddBtoA').val(patch.dualDelay_BtoA);
 		$('#ddBtoA').next().next().val(patch.dualDelay_BtoA);
 		$('#ddPanB').val(patch.dualDelay_PanB);
 		$('#ddPanB').next().next().val(patch.dualDelay_PanB);
 		$('#ddBtoOut').val(patch.dualDelay_BtoOut);
 		$('#ddBtoOut').next().next().val(patch.dualDelay_BtoOut);
 		$('#ddMix').val(patch.dualDelay_Mix);
 		$('#ddMix').next().next().val(patch.dualDelay_Mix);
 		if (patch.dualDelay_EQswitch == 'on'){
 			$('#ddEQSwitch').parent().addClass('on');
 			$('#ddEQSwitch').parent().next().slideDown();
 		}else{
 			$('#ddEQSwitch').parent().removeClass('on');
 			$('#ddEQSwitch').parent().next().slideUp();
 		}
 		$('#ddHCA').val(patch.dualDelay_hcA);
 		var dataResult = valueToLogSlide(20,20000,patch.dualDelay_hcA);
 		$('#ddHCA').next().next().val(dataResult);
 		$('#ddHCB').val(patch.dualDelay_hcB);
 		var dataResult = valueToLogSlide(20,20000,patch.dualDelay_hcB);
 		$('#ddHCB').next().next().val(dataResult);
 		$('#ddLCA').val(patch.dualDelay_lcA);
 		var dataResult = valueToLogSlide(20,20000,patch.dualDelay_lcA);
 		$('#ddLCA').next().next().val(dataResult);
 		$('#ddLCB').val(patch.dualDelay_lcB);
 		var dataResult = valueToLogSlide(20,20000,patch.dualDelay_lcB);
 		$('#ddLCB').next().next().val(dataResult);
 		
 		if (patch.modulation_switch == 'on'){
 			$('#modulation').parent().addClass('on');
 			$('#modulation').parent().next().slideDown();
 		}else{
 			$('#modulation').parent().removeClass('on');
 			$('#modulation').parent().next().slideUp();
 		}
 		
 		if (patch.chorus_switch == 'on'){
 			$('#chorusSwitch').parent().addClass('on');
 			$('#chorusSwitch').parent().next().slideDown();
 		}else{
 			$('#chorusSwitch').parent().removeClass('on');
 			$('#chorusSwitch').parent().next().slideUp();
 		}
 		$('#chorusDelay').val(patch.chorus_delay);
 		$('#chorusDelay').next().next().val(patch.chorus_delay);
 		$('#chorusRate').val(patch.chorus_rate);
 		$('#chorusRate').next().next().val(patch.chorus_rate);
 		$('#chorusDepth').val(patch.chorus_depth);
 		$('#chorusDepth').next().next().val(patch.chorus_depth);
 		if (patch.chorus_invertSwitch == 'on'){
 			$('#chorusInvertSwitch').parent().addClass('on');
 		}else{
 			$('#chorusInvertSwitch').parent().removeClass('on');
 		}
 		$('#chorusMix').val(patch.chorus_mix);
 		$('#chorusMix').next().next().val(patch.chorus_mix);
 		$('#chorusLC').val(patch.chorus_lc);
 		var dataResult = valueToLogSlide(20,1000,patch.chorus_lc);
 		$('#chorusLC').next().next().val(dataResult);
 		
 		if (patch.tremolo_switch == 'on'){
 			$('#tremoloSwitch').parent().addClass('on');
 			$('#tremoloSwitch').parent().next().slideDown();
 		}else{
 			$('#tremoloSwitch').parent().removeClass('on');
 			$('#tremoloSwitch').parent().next().slideUp();
 		}
 		$('#tremoloRateBPM').val(patch.tremolo_rateBPM);
 		$('#tremoloRate').val(patch.tremolo_rate);
 		$('#tremoloRate').next().next().val(patch.tremolo_rate);
 		$('#tremoloDepth').val(patch.tremolo_depth);
 		$('#tremoloDepth').next().next().val(patch.tremolo_depth);
 		if (patch.tremolo_invertSwitch == 'on'){
 			$('#tremoloInvertSwitch').parent().addClass('on');
 			$('#tremoloInvertSwitch').parent().next().slideDown();
 		}else{
 			$('#tremoloInvertSwitch').parent().removeClass('on');
 			$('#tremoloInvertSwitch').parent().next().slideUp();
 		}
 		$('#tremoloStereoWidth').val(patch.tremolo_stereoWidth);
 		$('#tremoloStereoWidth').next().next().val(patch.tremolo_stereoWidth);
 		$('#tremoloMix').val(patch.tremolo_mix);
 		$('#tremoloMix').next().next().val(patch.tremolo_mix);
 		$('#tremoloShape').val(patch.tremolo_shape);
 		$('#tremoloShape').next().next().val(patch.tremolo_shape);
 		
 		if (patch.reverb_switch == 'on'){
 			$('#reverb').parent().addClass('on');
 			$('#reverb').parent().next().slideDown();
 		}else{
 			$('#reverb').parent().removeClass('on');
 			$('#reverb').parent().next().slideUp();
 		}
		$('#reverbType').val(patch.reverb_type);
 		if (patch.reverbDelaySwitch == 'on'){
 			$('#reverbDelaySwitch').parent().addClass('on');
 			$('#reverbDelaySwitch').parent().next().slideDown();
 		}else{
 			$('#reverbDelaySwitch').parent().removeClass('on');
 			$('#reverbDelaySwitch').parent().next().slideUp();
 		}
 		$('#reverbDelayBPM').val(patch.reverbDelayBPM);
 		$('#reverbDelay').val(patch.reverbDelay);
 		$('#reverbDelay').next().next().val(patch.reverbDelay);
 		if (patch.reverb_EQswitch == 'on'){
 			$('#reverbEQSwitch').parent().addClass('on');
 			$('#reverbEQSwitch').parent().next().slideDown();
 		}else{
 			$('#reverbEQSwitch').parent().removeClass('on');
 			$('#reverbEQSwitch').parent().next().slideUp();
 		}
 		$('#reverbHC').val(patch.reverb_hc);
 		var dataResult = valueToLogSlide(1200,20000,patch.reverb_hc);
 		$('#reverbHC').next().next().val(dataResult);
 		$('#reverbLC').val(patch.reverb_lc);
 		var dataResult = valueToLogSlide(20,5000,patch.reverb_lc);
 		$('#reverbLC').next().next().val(dataResult);
 		$('#reverbMix').val(patch.reverb_mix);
 		$('#reverbMix').next().next().val(patch.reverb_mix);
 		
 		if (patch.compressor_switch == 'on'){
 			$('#compressor').parent().addClass('on');
 			$('#compressor').parent().next().slideDown();
 		}else{
 			$('#compressor').parent().removeClass('on');
 			$('#compressor').parent().next().slideUp();
 		}
 		$('#compressorThreshold').val(patch.compressor_threshold);
 		$('#compressorThreshold').next().next().val(patch.compressor_threshold);
 		$('#compressorRatio').val(patch.compressor_ratio);
 		$('#compressorRatio').next().next().val(patch.compressor_ratio);
 		$('#compressorMakeup').val((patch.compressor_makeup - 1 )*100);
 		$('#compressorMakeup').next().next().val((patch.compressor_makeup - 1 )*100);
 		$('#compressorDry').val(patch.compressor_dry);
 		$('#compressorDry').next().next().val(patch.compressor_dry);
 		
 		if (patch.eq_switch == 'on'){
 			$('#eq').parent().addClass('on');
 			$('#eq').parent().next().slideDown();
 		}else{
 			$('#eq').parent().removeClass('on');
 			$('#eq').parent().next().slideUp();
 		}
 		 		
 		if (patch.eq_HCswitch == 'on'){
 			$('#eqHCSwitch').parent().addClass('on');
 			$('#eqHCSwitch').parent().next().slideDown();
 		}else{
 			$('#eqHCSwitch').parent().removeClass('on');
 			$('#eqHCSwitch').parent().next().slideUp();
 		}
 		$('#eqHC').val(patch.eq_HC);
 		var dataResult = valueToLogSlide(.1,20,patch.eq_HC);
 		$('#eqHC').next().next().val(patch.dataResult);
 		
 		if (patch.eq_LCswitch == 'on'){
 			$('#eqLCSwitch').parent().addClass('on');
 			$('#eqLCSwitch').parent().next().slideDown();
 		}else{
 			$('#eqLCSwitch').parent().removeClass('on');
 			$('#eqLCSwitch').parent().next().slideUp();
 		}
 		$('#eqLC').val(patch.eq_LC);
 		var dataResult = valueToLogSlide(.1,20,patch.eq_LC);
 		$('#eqLC').next().next().val(patch.dataResult);
 		
 		if (patch.eq_HSswitch == 'on'){
 			$('#eqHSSwitch').parent().addClass('on');
 			$('#eqHSSwitch').parent().next().slideDown();
 		}else{
 			$('#eqHSSwitch').parent().removeClass('on');
 			$('#eqHSSwitch').parent().next().slideUp();
 		}
 		$('#eqHS').val(patch.eq_HSamount);
 		$('#eqHS').next().next().val(patch.eq_HSamount);
 		if (patch.eq_P1switch == 'on'){
 			$('#eqP1Switch').parent().addClass('on');
 			$('#eqP1Switch').parent().next().slideDown();
 		}else{
 			$('#eqP1Switch').parent().removeClass('on');
 			$('#eqP1Switch').parent().next().slideUp();
 		}
 		$('#eqP1a').val(patch.eq_P1amount);
 		$('#eqP1a').next().next().val(patch.eq_P1amount);
 		$('#eqP1f').val(patch.eq_P1freq);
 		var dataResult = valueToLogSlide(100,8000,patch.eq_P1freq);
 		$('#eqP1f').next().next().val(dataResult);
 		if (patch.eq_P2switch == 'on'){
 			$('#eqP2Switch').parent().addClass('on');
 			$('#eqP2Switch').parent().next().slideDown();
 		}else{
 			$('#eqP2Switch').parent().removeClass('on');
 			$('#eqP2Switch').parent().next().slideUp();
 		}
 		$('#eqP2a').val(patch.eq_P2amount);
 		$('#eqP2a').next().next().val(patch.eq_P2amount);
 		$('#eqP2f').val(patch.eq_P2freq);
 		var dataResult = valueToLogSlide(100,8000,patch.eq_P2freq);
 		$('#eqP2f').next().next().val(dataResult);
 		if (patch.eq_LSswitch == 'on'){
 			$('#eqLSSwitch').parent().addClass('on');
 			$('#eqLSSwitch').parent().next().slideDown();
 		}else{
 			$('#eqLSSwitch').parent().removeClass('on');
 			$('#eqLSSwitch').parent().next().slideUp();
 		}
 		$('#eqLS').val(patch.eq_LSamount);
 		$('#eqLS').next().next().val(patch.eq_LSamount);
 		
 		if (patch.volume_switch == 'on'){
 			$('#volume').parent().addClass('on');
 			$('#volume').parent().next().slideDown();
 		}else{
 			$('#volume').parent().removeClass('on');
 			$('#volume').parent().next().slideUp();
 		}
 		$('#volumeInput').val(patch.volume_input*100);
 		$('#volumeInput').next().next().val(patch.volume_input*100);
 		
 		if (patch.attenuate_switch == 'on'){
 			$('#attenuate').parent().addClass('on');
 			$('#attenuate').parent().next().slideDown();
 		}else{
 			$('#attenuate').parent().removeClass('on');
 			$('#attenuate').parent().next().slideUp();
 		}
 		
 		if (patch.limiter_switch == 'on'){
 			$('#limiter').parent().addClass('on');
 			$('#limiter').parent().next().slideDown();
 		}else{
 			$('#limiter').parent().removeClass('on');
 			$('#limiter').parent().next().slideUp();
 		}
 		$('#limiterThreshold').val(patch.limiter_threshold);
 		$('#limiterThreshold').next().next().val(patch.limiter_threshold);
 		 		
 		if (patch.meters_switch == 'on'){
 			$('#meters').parent().addClass('on');
 			$('#meters').parent().next().slideDown();
 		}else{
 			$('#meters').parent().removeClass('on');
 			$('#meters').parent().next().slideUp();
 		}
 		
 		$('#trig-mp-numPads').val(patch.trig_pads);
 		$('#trig-mp-pitchCalc').val(patch.trig_pitchCalc);
 		$('#trig-mp-lp').val(patch.trig_lp);
 		$('#trig-mp-lp').next().next().val(patch.trig_lp);
 		$('#trig-qt-lp').val(patch.trig_lpqt);
 		$('#trig-qt-lp').next().next().val(patch.trig_lpqt);
 		$('#trig-mp-rp').val(patch.trig_rp);
 		$('#trig-mp-rp').next().next().val(patch.trig_rp);
 		$('#trig-et-start').val(patch.trig_etStart);
 		$('#trig-et-key').val(patch.trig_etKey);
 		
 		rebuildMpPads();

 	}
 	

	// Update parameter values when any slider changes
	
	$('.data').change(function() {
		if ($(this).parent().children('.slide').hasClass('log')){
			var minv = Math.log(Number($(this).parent().children('.slide').data('lo')));
			var maxv = Math.log(Number($(this).parent().children('.slide').data('hi')));
			var scale = (maxv-minv) / 100;
			var dataResult = (Math.log(Number($(this).val()))-minv) / scale;
			$(this).parent().children('.slide').val(dataResult);
		} else {
			$(this).parent().children('.slide').val($(this).val());
		}
		$(this).blur();
		updatePatch();
		
	});
	
	$('.slide').on('input', function() {
		if ($(this).hasClass('log')){
			var minv = Math.log($(this).data('lo'));
			var maxv = Math.log($(this).data('hi'));
			var scale = (maxv-minv) / 100;
			var dataResult = Math.exp(minv + scale*($(this).val())).toFixed(2);
			$(this).parent().children('.data').val(dataResult);
		} else {
	    	$(this).parent().children('.data').val($(this).val());
	    }
	    
	    // CHANGE GLOBAL LFO FREQUENCIES
	    
	    if($(this).hasClass('flt1lFreqP')){
	    	patch.flt1_lFreq = dataResult;
	    	flt1_pmlfo.frequency.value = patch.flt1_lFreq;
	    } else if($(this).hasClass('flt2lFreqP')){
	    	patch.flt2_lFreq = dataResult;
	    	flt2_pmlfo.frequency.value = patch.flt1_lFreq;
	    } else if($(this).hasClass('osc1_pmlFreqP')){
	    	patch.osc1_pmlFreq = dataResult;
	    	osc1_pmlfo.frequency.value = patch.osc1_pmlFreq;
	    } else if($(this).hasClass('osc1_amlFreqP')){
	    	patch.osc1_amlFreq = dataResult;
	    	osc1_amlfo.frequency.value = patch.osc1_amlFreq;
	    } else if($(this).hasClass('osc2_pmlFreqP')){
	    	patch.osc2_pmlFreq = dataResult;
	    	osc2_pmlfo.frequency.value = patch.osc2_pmlFreq;
	    } else if($(this).hasClass('osc2_amlFreqP')){
	    	patch.osc2_amlFreq = dataResult;
	    	osc2_amlfo.frequency.value = patch.osc2_amlFreq;
	    } else if($(this).hasClass('osc3_pmlFreqP')){
	    	patch.osc3_pmlFreq = dataResult;
	    	osc3_pmlfo.frequency.value = patch.osc3_pmlFreq;
	    } else if($(this).hasClass('osc3_amlFreqP')){
	    	patch.osc3_amlFreq = dataResult;
	    	osc3_amlfo.frequency.value = patch.osc3_amlFreq;
	    } else {
	    	updatePatch();
	    } 
	    
    
	});
	
	// Drop down noize and drop down legato
	 
	$('.parameter2').change(function() {
		$(this).blur();
		
		if (this.id === 'osc1_wave' && ($('#osc1_wave').val() == 'nw' || $('#osc1_wave').val() == 'np' || $('#osc1_wave').val() == 'nb')){		
			$('#osc1_superContainer').slideUp();
			$('#osc1_pulseContainer').slideUp();
		}else if(this.id === 'osc1_wave'){
			$('#osc1_superContainer').slideDown();
			if($('#osc1_wave').val() == 'square'){$('#osc1_pulseContainer').slideDown()}else{$('#osc1_pulseContainer').slideUp()} 
		}
		if (this.id === 'osc2_wave' && ($('#osc2_wave').val() == 'nw' || $('#osc2_wave').val() == 'np' || $('#osc2_wave').val() == 'nb')){		
			$('#osc2_superContainer').slideUp();
			$('#osc2_pulseContainer').slideUp();
		}else if(this.id === 'osc2_wave'){
			$('#osc2_superContainer').slideDown();
			if($('#osc2_wave').val() == 'square'){$('#osc2_pulseContainer').slideDown()}else{$('#osc2_pulseContainer').slideUp()} 
		}
		if (this.id === 'osc3_wave' && ($('#osc3_wave').val() == 'nw' || $('#osc3_wave').val() == 'np' || $('#osc3_wave').val() == 'nb')){		
			$('#osc3_superContainer').slideUp();
			$('#osc3_pulseContainer').slideUp();
		}else if(this.id === 'osc3_wave'){
			$('#osc3_superContainer').slideDown();
			if($('#osc3_wave').val() == 'square'){$('#osc3_pulseContainer').slideDown()}else{$('#osc3_pulseContainer').slideUp()} 
		}

		if (this.id === 'osc1_pulselShape' && osc1.pulselShape.value == 'rnd'){		
			$('#osc1_pulselrnd').slideDown();
		}else if(this.id === 'osc1_pulselShape'){
			$('#osc1_pulselrnd').slideUp();
		};
		if (this.id === 'osc1_pmlShape' && osc1.pmlShape.value == 'rnd'){		
			$('#osc1_pmlrnd').slideDown();
		}else if(this.id === 'osc1_pmlShape'){
			$('#osc1_pmlrnd').slideUp();
		};
		if (this.id === 'osc1_amlShape' && osc1.amlShape.value == 'rnd'){		
			$('#osc1_amlrnd').slideDown();
		}else if(this.id === 'osc1_amlShape'){
			$('#osc1_amlrnd').slideUp();
		};
		if (this.id === 'osc2_pulselShape' && osc2.pulselShape.value == 'rnd'){		
			$('#osc2_pulselrnd').slideDown();
		}else if(this.id === 'osc2_pulselShape'){
			$('#osc2_pulselrnd').slideUp();
		};
		if (this.id === 'osc2_pmlShape' && $('#osc2pmlShape').val() == 'rnd'){		
			$('#osc2_pmlrnd').slideDown();
		}else if(this.id === 'osc2pmlShape'){
			$('#osc2_pmlrnd').slideUp();
		};
		if (this.id === 'osc2_amlShape' && $('#osc2amlShape').val() == 'rnd'){		
			$('#osc2_amlrnd').slideDown();
		}else if(this.id === 'osc2amlShape'){
			$('#osc2_amlrnd').slideUp();
		};
		if (this.id === 'osc3_pulselShape' && osc3.pulselShape.value == 'rnd'){		
			$('#osc3_pulselrnd').slideDown();
		}else if(this.id === 'osc3_pulselShape'){
			$('#osc3_pulselrnd').slideUp();
		};
		if (this.id === 'osc3_pmlShape' && $('#osc3pmlShape').val() == 'rnd'){		
			$('#osc3_pmlrnd').slideDown();
		}else if(this.id === 'osc3pmlShape'){
			$('#osc3_pmlrnd').slideUp();
		};
		if (this.id === 'osc3_amlShape' && $('#osc3amlShape').val() == 'rnd'){		
			$('#osc3_amlrnd').slideDown();
		}else if(this.id === 'osc3amlShape'){
			$('#osc3_amlrnd').slideUp();
		};
		
		updatePatch();
	});
		
	// On/Off switches cause drop downs

	
	$('.onOff').click(function() {
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).next().slideUp("slow");
		} else {
			$(this).addClass('on');
			$(this).next().slideDown("slow");
		};
		
		
		// BPM SWITCH CHANGES
		if($(this).attr("id") == 'bpm_switch'){
			if($(this).hasClass('on')){
				patch['bpm_switch'] = 'on';
				$('.bpmPart').slideDown("slow");
			} else {
				patch['bpm_switch'] = 'off';
				$('.bpmPart').slideUp("slow");
			};
		}
		
		updatePatch();
	});
    
    $('#tuning').click(function() {
    	$('#settingsDrop').slideToggle("fast");
    	if($(this).hasClass('on')){$(this).removeClass('on')} else {
    		$(this).addClass('on');
    		$('#midi').removeClass('on');
    		$('#midiDrop').slideUp("fast");
    	}
    });
    
    $('#midi').click(function() {
    	$('#midiDrop').slideToggle("fast");
    	if($(this).hasClass('on')){$(this).removeClass('on')} else {
    		$(this).addClass('on');
    		$('#tuning').removeClass('on');
    		$('#settingsDrop').slideUp("fast");
    	}
    });
    
    $("#panic").on( "touchstart mousedown", function(e) {

		e.stopPropagation(); e.preventDefault();
		$("#buttonContainer").children().removeClass("depressed");
		delayFB.gain.value = 0;
		ddAFB.gain.value = 0;
		ddBFB.gain.value = 0;
		ddAtoB.gain.value = 0;
		ddBtoA.gain.value = 0;
		$("#panic").addClass('on');
		$('#panicDrop').slideDown("fast");
		var now = context.currentTime;
    	pvLength = panicVoices.length;
    	for ( i = 0; i <= pvLength; i += 1 ) {
    		if(panicVoices[i]){
	    		try {
				    panicVoices[i].stop(now);
				}
				catch(err) {
				    console.log('Avoiding InvalidStateError')
				}
    		}
    	}
    	$('#panicDrop').delay(2000).slideUp("fast").queue(function (next) {
		    $("#panic").removeClass('on');
		    updatePatch();
		    next();
		});
		
	});
	
	$( "#newPatches" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		
		var aHeight = $('#A').outerHeight() - $('#Z').outerHeight()*5;
		// $("#patchesContainer").css("max-height", aHeight);
		$("#patchesCatListContainer").css("max-height", aHeight);
		
		$('#patchesContainer').slideToggle("fast");
		
		if($('#newPatches').hasClass('on')){
			$('#newPatches').removeClass('on');
			$('#patchArrows').removeClass('on');
		} else {
			$('#newPatches').addClass('on');
			$('#patchArrows').addClass('on');
			$('#volumeTopContainer').slideUp("fast");
	    	$('#volumeTop').removeClass('on');
	    	$('#loadContainer').slideUp("fast");
	    	$('#loadButton').removeClass('on');
	    	$('#saveContainer').slideUp("fast");
	    	$('#saveButton').removeClass('on');
	    	$('#menuContainer').slideUp("fast");
	    	$('#menu').removeClass('on');
   		}
		
	});

	
	$(document).on( "change","#patchTypeDrop",function(e) {
		var e = document.getElementById("patchTypeDrop");
		if(e.options[e.selectedIndex].value == "all"){
			$(".patchesName").show();
			$("#userExplanation").hide();
		} else if (e.options[e.selectedIndex].value == "user patches"){
			$(".patchesName").hide();
			$(".patchesName.user").show();
			if (userPatchList.length < 1){$("#userExplanation").show()}
		} else {
			var dropValue = ".pt-" + e.options[e.selectedIndex].value;
			$(".patchesName").hide();
			$(".patchesName"+dropValue).show();
			$("#userExplanation").hide();
		}
	});
	
	$(document).on( "touchstart mousedown",".patchesName",function(e) {
		
		var thisDiv = this;
		
		if(thisDiv.getAttribute('data-url')){
			
			// PRESETS
			
			var thisURL = "patches/db/"+thisDiv.getAttribute('data-url')+".json";
			
			var thisPatchName = this.innerHTML;
		    document.getElementById('currentPatchName').innerHTML="loading <div class='convSpinner' style='float:left; margin:0 .5em 0 0;'></div>";
		    
		    $.getJSON(thisURL, function(data) {
			    var patchOld = data;
			    
		        patch = patchFix(patchOld);
		        
		        patch2HTML();
		        updatePatch();
		        document.getElementById('currentPatchName').innerHTML=thisPatchName;
			});
			
		} else {
			
			// USER PATCHES
			
			var uPnumber = thisDiv.getAttribute('user');
			patch = patchFix(userPatchList[uPnumber-1]);
			patch2HTML();
		    updatePatch();
		    document.getElementById('currentPatchName').innerHTML=this.innerHTML;
		}
		
		$(".patchesName").removeClass('on');
		$(this).addClass('on');
		
	});
	
	$( "#menu" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#menuContainer').slideToggle("fast");
    	if($('#menu').hasClass('on')){
    		$('#menu').removeClass('on')
    	} else {

    		var buttonObj = $('#menu');
    		var buttonObjOff = buttonObj.offset().left;
    		var leftPx = buttonObjOff+'px';
    		$('#menuContainer').css({'left':leftPx});
    		
    		var containerWidth = $('#menuContainer').outerWidth();
    		var docwidth = document.body.clientWidth;
    		if ((containerWidth + buttonObjOff) > docwidth) {
    			var newLeft = docwidth - containerWidth;
    			var newLeftPx = newLeft+'px';
    			$('#menuContainer').css({'left':newLeftPx});
    		}
    		
    		$('#menu').addClass('on');
    		
    		$('#volumeTopContainer').slideUp("fast");
    		$('#volumeTop').removeClass('on');
    		$('#loadContainer').slideUp("fast");
    		$('#loadButton').removeClass('on');
    		$('#saveContainer').slideUp("fast");
    		$('#saveButton').removeClass('on');
    		$('#patchesContainer').slideUp("fast");
			$('#newPatches').removeClass('on');
			$('#patchArrows').removeClass('on');
    	}
	});
	
	$( "#saveButton" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#saveContainer').slideToggle("fast");
    	if($('#saveButton').hasClass('on')){
    		$('#saveButton').removeClass('on')
    	} else {
    		
    		var buttonObj = $('#saveButton');
    		var buttonObjOff = buttonObj.offset().left;
    		var leftPx = buttonObjOff+'px';
    		$('#saveContainer').css({'left':leftPx});
    		
    		var containerWidth = $('#saveContainer').outerWidth();
    		var docwidth = document.body.clientWidth;
    		if ((containerWidth + buttonObjOff) > docwidth) {
    			var newLeft = docwidth - containerWidth;
    			var newLeftPx = newLeft+'px';
    			$('#saveContainer').css({'left':newLeftPx});
    		}
    		
    		$('#saveButton').addClass('on');
    		
    		$('#volumeTopContainer').slideUp("fast");
    		$('#volumeTop').removeClass('on');
    		$('#menuContainer').slideUp("fast");
    		$('#menu').removeClass('on');
    		$('#loadContainer').slideUp("fast");
    		$('#loadButton').removeClass('on');
    		$('#patchesContainer').slideUp("fast");
			$('#newPatches').removeClass('on');
			$('#patchArrows').removeClass('on');
    	}
	});
	
	$( "#loadButton" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#loadContainer').slideToggle("fast");
    	if($('#loadButton').hasClass('on')){
    		$('#loadButton').removeClass('on')
    	} else {

    		var buttonObj = $('#loadButton');
    		var buttonObjOff = buttonObj.offset().left;
    		var leftPx = buttonObjOff+'px';
    		$('#loadContainer').css({'left':leftPx});
    		
    		var containerWidth = $('#loadContainer').outerWidth();
    		var docwidth = document.body.clientWidth;
    		if ((containerWidth + buttonObjOff) > docwidth) {
    			var newLeft = docwidth - containerWidth;
    			var newLeftPx = newLeft+'px';
    			$('#loadContainer').css({'left':newLeftPx});
    		}
    		
    		$('#loadButton').addClass('on');
    		
    		$('#volumeTopContainer').slideUp("fast");
    		$('#volumeTop').removeClass('on');
    		$('#menuContainer').slideUp("fast");
    		$('#menu').removeClass('on');
    		$('#saveContainer').slideUp("fast");
    		$('#saveButton').removeClass('on');
    		$('#patchesContainer').slideUp("fast");
			$('#newPatches').removeClass('on');
			$('#patchArrows').removeClass('on');
    	}
	});
	
	// open About overlay	
	$( "#menuAbout" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#aboutContainerNew').slideToggle("fast", function() {
		    $('#menuContainer').slideToggle();
		    $('#menu').removeClass('on');
		});
	});
	
	$( "#aboutContainerNewClose" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#aboutContainerNew').slideToggle("fast");
	});
	
	$( "#menuInstructions" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#instructionsContainerNew').slideToggle("fast", function() {
		    $('#menuContainer').slideToggle();
		    $('#menu').removeClass('on');
		});
	});
	
	$( "#instructionsContainerNewClose" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#instructionsContainerNew').slideToggle("fast");
	});
	
	
	$( "#volumeTop" ).on( "touchstart mousedown", function(e) {
		e.stopPropagation(); e.preventDefault();
		$('#volumeTopContainer').slideToggle("fast", function() {
		    
		  });
    	if($('#volumeTop').hasClass('on')){
    		$('#volumeTop').removeClass('on')
    	} else {

    		var buttonObj = $('#volumeTop');
    		var buttonObjOff = buttonObj.offset().left;
    		var leftPx = buttonObjOff+'px';
    		$('#volumeTopContainer').css({'left':leftPx});
    		
    		var containerWidth = $('#volumeTopContainer').outerWidth();
    		var docwidth = document.body.clientWidth;
    		if ((containerWidth + buttonObjOff) > docwidth) {
    			var newLeft = docwidth - containerWidth;
    			var newLeftPx = newLeft+'px';
    			$('#volumeTopContainer').css({'left':newLeftPx});
    		}
    		
    		$('#volumeTop').addClass('on');
    		
    		$('#menuContainer').slideUp("fast");
    		$('#menu').removeClass('on');
    		$('#loadContainer').slideUp("fast");
    		$('#loadButton').removeClass('on');
    		$('#saveContainer').slideUp("fast");
    		$('#saveButton').removeClass('on');
    		$('#patchesContainer').slideUp("fast");
			$('#newPatches').removeClass('on');
			$('#patchArrows').removeClass('on');
    	}
	});
	
	$('#volumeTopSlide').on('input', function() {
		var minv = Math.log(1);
		var maxv = Math.log(100);
		var scale = (maxv-minv) / 100;
		var volumeVal = Number($('#volumeTopSlide').val());
		var dataResult = (Math.exp(minv + scale*(volumeVal)) - 1).toFixed(2);
		var postVol = dataResult * .01;
		postVolume.gain.value = postVol;
	});
	
	// MIDI PARAMETER CHANGES
	
	$('#lowMidi').change(function() {
		lowMidi = Number($('#lowMidi').val());
	});
	
	$('#midiChannel').change(function() {
		midiChannel = Number($('#midiChannel').val());
	});
	
	$('#getMidiFromMidi').on( "touchstart mousedown", function(e) {
		$('#getMidiFromMidi').attr('disabled', 'disabled');
		midiLowMidi = true;
	});
    
    // PATCH NAME CHANGE
    
    $('#patchName').change(function() {
    	patch.patchName = $('#patchName').val();
    });
    
    // PATCH MANAGEMENT - DOWNLOAD / LOAD / PATCH CHANGE
    
    $('#downloadData').click(function() {

    	var json = JSON.stringify(patch);
    	this.href = 'data:plain/text,' + json;
    	this.download = patch.patchName + ".websynths-patch.json";
    	userPatchList.push(JSON.parse(JSON.stringify(patch)));
    	
    	var upNumber = userPatchList.length;
	    if (upNumber < 10){upNumber = "0" +upNumber;}
	    $('#currentPatchName').html('U-'+upNumber+': '+patch.patchName);
	    $(".patchesName").removeClass('on');
	    var currentPatchList = $("#patchesList").html();
	    currentPatchList += '<div class="patchesName on user" user="'+userPatchList.length+'">U-'+upNumber+': '+patch.patchName+'</div>';
	    $("#patchesList").html(currentPatchList);

    	$("#userExplanation").hide();
    	$('#saveContainer').slideUp();
	    $('#saveButton').removeClass('on');
    });
    
    $("#loadDataTrig").click(function () {
    	$("#loadData").trigger('click');
	});
    
    $("#loadData").change(function( event ) {
	    var fr = new FileReader();
	    fr.onload = function(){
		    
	        var patchOld = JSON.parse(this.result);
	        patch = patchFix(patchOld);
	        patch2HTML();
	        updatePatch();
	        userPatchList.push(JSON.parse(JSON.stringify(patch)));

	        var upNumber = userPatchList.length;
	        if (upNumber < 10){upNumber = "0" +upNumber;}
	        $('#currentPatchName').html('U-'+upNumber+': '+patch.patchName);
	        $(".patchesName").removeClass('on');
	        var currentPatchList = $("#patchesList").html();
	        currentPatchList += '<div class="patchesName on user" user="'+userPatchList.length+'">U-'+upNumber+': '+patch.patchName+'</div>';
	        $("#patchesList").html(currentPatchList);
	        $('#loadContainer').slideUp();
	        $('#loadButton').removeClass('on');
	        $("#userExplanation").hide();
	    }
	    fr.readAsText(this.files[0]);
	});
	
    $("#loadTuningTrig").click(function () {
    	$("#loadTuning").trigger('click');
	});
    
    $("#loadTuning").change(function( event ) {
	    var fr = new FileReader();
	    fr.onload = function(){
	        var patchOld = JSON.parse(this.result);
	        patchNew = patchFix(patchOld);
	        
	        patch.trig_system = patchNew.trig_system;
	        patch.trig_pads = patchNew.trig_pads;
	        patch.trig_pitchCalc = patchNew.trig_pitchCalc;
	        patch.trig_lp = patchNew.trig_lp;
	        patch.trig_rp = patchNew.trig_rp;
	        patch.trig_etStart = patchNew.trig_etStart;
	        patch.trig_etKey = patchNew.trig_etKey;
	        patch.trig_p = patchNew.trig_p;
	        patch.trig_lpqt = patchNew.trig_lpqt;
	        patch.trig_eqStart = patchNew.trig_eqStart;
	        patch.trig_etStartInKey = patchNew.trig_etStartInKey;
	        patch.trig_jiF = patchNew.trig_jiF;
	        patch.trig_jiKey = patchNew.trig_jiKey;
	        
	        patch2HTML();
	        updatePatch();
	        $('#loadContainer').slideUp();
	        $('#loadButton').removeClass('on');

	    }
	    fr.readAsText(this.files[0]);
	});
	
	/*
	$('#patchDrop').change(function( event ) {
        patchOld = JSON.parse(JSON.stringify(patchList[$('#patchDrop').val()]));
        patch = patchFix(patchOld);
        patch2HTML();
		updatePatch();
		$('#patchDrop').blur();
	});
	*/
	
	
	$('#patchNext').click(function(e) {
		
		var totalPatches = $(".patchesName").length;		
		var nextPatchNum = $(".patchesName.on").index()+1;
		if (nextPatchNum == totalPatches){nextPatchNum = 1}
		
		var patchThis = $(".patchesName").eq(nextPatchNum);
		
		var patchThisDU = patchThis.data('url');
		
		if(patchThisDU){
			
			// PRESETS
			
			var thisURL = "patches/db/"+patchThisDU+".json";
			
			var thisPatchName = patchThis.html();
			
		    document.getElementById('currentPatchName').innerHTML="loading <div class='convSpinner' style='float:left; margin:0 .5em 0 0;'></div>";
		    
		    $.getJSON(thisURL, function(data) {
			    var patchOld = data;
			    
		        patch = patchFix(patchOld);
		        
		        patch2HTML();
		        updatePatch();
		        document.getElementById('currentPatchName').innerHTML=thisPatchName;
			});
			
		} else {
			
			// USER PATCHES
			
			var uPnumber = patchThis.attr('user');
			var thisPatchName = patchThis.html();
			
			console.log(uPnumber);
			
			patch = patchFix(userPatchList[uPnumber-1]);
			patch2HTML();
		    updatePatch();
		    document.getElementById('currentPatchName').innerHTML=thisPatchName;
		    
		}
		
		$(".patchesName").removeClass('on');
		patchThis.addClass('on');
		
	});
	
	$('#patchPrev').click(function() {
	
		var totalPatches = $(".patchesName").length;		
		var nextPatchNum = $(".patchesName.on").index()-1;
		if (nextPatchNum == 0){nextPatchNum = totalPatches -1}
		
		var patchThis = $(".patchesName").eq(nextPatchNum);
		
		var patchThisDU = patchThis.data('url');
		
		if(patchThisDU){
			
			// PRESETS
			
			var thisURL = "patches/db/"+patchThisDU+".json";
			
			var thisPatchName = patchThis.html();
			
		    document.getElementById('currentPatchName').innerHTML="loading <div class='convSpinner' style='float:left; margin:0 .5em 0 0;'></div>";
		    
		    $.getJSON(thisURL, function(data) {
			    var patchOld = data;
			    
		        patch = patchFix(patchOld);
		        
		        patch2HTML();
		        updatePatch();
		        document.getElementById('currentPatchName').innerHTML=thisPatchName;
			});
			
		} else {
			
			// USER PATCHES
			
			var uPnumber = patchThis.attr('user');
			var thisPatchName = patchThis.html();
			
			console.log(uPnumber);
			
			patch = patchFix(userPatchList[uPnumber-1]);
			patch2HTML();
		    updatePatch();
		    document.getElementById('currentPatchName').innerHTML=thisPatchName;
		    
		}
		
		$(".patchesName").removeClass('on');
		patchThis.addClass('on');
		
	});
	
	// REVERB CHANGE
	
    $('#reverbType').change(function() {
    	reverbURL = 'ir/'+$('#reverbType').val();
    	setReverbImpulseResponse(reverbURL, "r");
    });
    
    $('#osc1_convolverType').change(function() {
    	reverbURL = $('#osc1_convolverType').val();
    	loadOscImpulseResponse(reverbURL, 1);
    });
    
    $('#osc2_convolverType').change(function() {
    	reverbURL = $('#osc2_convolverType').val();
    	loadOscImpulseResponse(reverbURL, 2);
    });
    
    $('#osc3_convolverType').change(function() {
    	reverbURL = $('#osc3_convolverType').val();
    	loadOscImpulseResponse(reverbURL, 3);
    });
    
    
    // AMPLITUDE ENVELOPE SIMPLE/COMPLEX CHANGES
    
    $('#aeOptions').change(function() {
    	if ( $('#aeOptions').val() == "basic"){
    		patch.ae_options = "basic";
    		$('.aeOptionsBasic').slideDown();
    		$('.aeOptionsExtended').slideUp();
    	} else {
    		patch.ae_options = "extended";
    		$('.aeOptionsBasic').slideUp();
    		$('.aeOptionsExtended').slideDown();
    	}
    });
    
    
    // LFO SIMPLE/COMPLEX CHANGES
    
    $('#osc1_pulselOptions').change(function() {
    	if ( osc1.pulselOptions.value == "basic"){
    		$('.osc1_pulselOptionsExtended').slideUp();
    	} else {
    		$('.osc1_pulselOptionsExtended').slideDown();
    	}
    });
    
    $('#osc1_pmlOptions').change(function() {
    	if ( osc1.pmlOptions.value == "basic"){
    		$('.osc1_pmlOptionsExtended').slideUp();
    	} else {
    		$('.osc1_pmlOptionsExtended').slideDown();
    	}
    });
    
    $('#osc1_amlOptions').change(function() {
    	if ( osc1.amlOptions.value == "basic"){
    		$('.osc1_amlOptionsExtended').slideUp();
    	} else {
    		$('.osc1_amlOptionsExtended').slideDown();
    	}
    });
    
    $('#osc2_pulselOptions').change(function() {
    	if ( osc2.pulselOptions.value == "basic"){
    		$('.osc2_pulselOptionsExtended').slideUp();
    	} else {
    		$('.osc2_pulselOptionsExtended').slideDown();
    	}
    });
        
    $('#osc2_pmlOptions').change(function() {
    	if ( $('#osc2_pmlOptions').val() == "basic"){
    		$('.osc2_pmlOptionsExtended').slideUp();
    	} else {
    		$('.osc2_pmlOptionsExtended').slideDown();
    	}
    });
    
    $('#osc2_amlOptions').change(function() {
    	if ( $('#osc2_amlOptions').val() == "basic"){
    		$('.osc2_amlOptionsExtended').slideUp();
    	} else {
    		$('.osc2_amlOptionsExtended').slideDown();
    	}
    });
    
    $('#osc3_pulselOptions').change(function() {
    	if ( osc3.pulselOptions.value == "basic"){
    		$('.osc3_pulselOptionsExtended').slideUp();
    	} else {
    		$('.osc3_pulselOptionsExtended').slideDown();
    	}
    });
    
    $('#osc3_pmlOptions').change(function() {
    	if ( $('#osc3_pmlOptions').val() == "basic"){
    		$('.osc3_pmlOptionsExtended').slideUp();
    	} else {
    		$('.osc3_pmlOptionsExtended').slideDown();
    	}
    });
    
    $('#osc3_amlOptions').change(function() {
    	if ( $('#osc3_amlOptions').val() == "basic"){
    		$('.osc3_amlOptionsExtended').slideUp();
    	} else {
    		$('.osc3_amlOptionsExtended').slideDown();
    	}
    });
    
    $('#flt1lOptions').change(function() {
    	if ( $('#flt1lOptions').val() == "basic"){
    		$('.flt1lOptionsExtended').slideUp();
    	} else {
    		$('.flt1lOptionsExtended').slideDown();
    	}
    });
    
    $('#flt2lOptions').change(function() {
    	if ( $('#flt2lOptions').val() == "basic"){
    		$('.flt2lOptionsExtended').slideUp();
    	} else {
    		$('.flt2lOptionsExtended').slideDown();
    	}
    });

    // BPM SYNC CHANGES
    
    $('.bpmP').change(function() {
    	
    	patch.bpm = document.querySelector("#bpm").value;
    	
	    var bpmChange = [
	    	['osc1_pulselBPM', 'osc1_pulselFreq', osc1.pulselFreq],
	    	['osc1_pulselDelayBPM', 'osc1_pulselDelay', osc1.pulselDelay],
	    	['osc1_pulselAttackBPM', 'osc1_pulselAttack', osc1.pulselAttack],
	    	['osc1_pulselReleaseBPM', 'osc1_pulselRelease', osc1.pulselRelease],
	    	['osc2_pulselBPM', 'osc2_pulselFreq', osc2.pulselFreq],
	    	['osc2_pulselDelayBPM', 'osc2_pulselDelay', osc2.pulselDelay],
	    	['osc2_pulselAttackBPM', 'osc2_pulselAttack', osc2.pulselAttack],
	    	['osc2_pulselReleaseBPM', 'osc2_pulselRelease', osc2.pulselRelease],
	    	['osc3_pulselBPM', 'osc3_pulselFreq', osc3.pulselFreq],
	    	['osc3_pulselDelayBPM', 'osc3_pulselDelay', osc3.pulselDelay],
	    	['osc3_pulselAttackBPM', 'osc3_pulselAttack', osc3.pulselAttack],
	    	['osc3_pulselReleaseBPM', 'osc3_pulselRelease', osc3.pulselRelease],
	    	['osc1_pmlBPM', 'osc1_pmlFreq', osc1.pmlFreq],
	    	['osc1_pmlDelayBPM', 'osc1_pmlDelay', osc1.pmlDelay],
	    	['osc1_pmlAttackBPM', 'osc1_pmlAttack', osc1.pmlAttack],
	    	['osc1_pmlReleaseBPM', 'osc1_pmlRelease', osc1.pmlRelease],
	    	['osc1_pmeDelayBPM', 'osc1_pmeDelay', osc1.pmeDelay],
	    	['osc1_pmeAttackBPM', 'osc1_pmeAttack', osc1.pmeAttack],
	    	['osc1_pmeReleaseBPM', 'osc1_pmeRelease', osc1.pmeRelease],
	    	['osc1_amlBPM', 'osc1_amlFreq', osc1.amlFreq],
	    	['osc1_amlDelayBPM', 'osc1_amlDelay', osc1.amlDelay],
	    	['osc1_amlAttackBPM', 'osc1_amlAttack', osc1.amlAttack],
	    	['osc1_amlReleaseBPM', 'osc1_amlRelease', osc1.amlRelease],
	    	['osc1_ameDelayBPM', 'osc1_ameDelay', osc1.ameDelay],
	    	['osc1_ameAttackBPM', 'osc1_ameAttack', osc1.ameAttack],
	    	['osc1_ameReleaseBPM', 'osc1_ameRelease', osc1.ameRelease],
	    	['osc2_pmlBPM', 'osc2_pmlFreq', osc2.pmlFreq],
	    	['osc2_pmlDelayBPM', 'osc2_pmlDelay', osc2.pmlDelay],
	    	['osc2_pmlAttackBPM', 'osc2_pmlAttack', osc2.pmlAttack],
	    	['osc2_pmlReleaseBPM', 'osc2_pmlRelease', osc2.pmlRelease],
	    	['osc2_pmeDelayBPM', 'osc2_pmeDelay', osc2.pmeDelay],
	    	['osc2_pmeAttackBPM', 'osc2_pmeAttack', osc2.pmeAttack],
	    	['osc2_pmeReleaseBPM', 'osc2_pmeRelease', osc2.pmeRelease],
	    	['osc2_amlBPM', 'osc2_amlFreq', osc2.amlFreq],
	    	['osc2_amlDelayBPM', 'osc2_amlDelay', osc2.amlDelay],
	    	['osc2_amlAttackBPM', 'osc2_amlAttack', osc2.amlAttack],
	    	['osc2_amlReleaseBPM', 'osc2_amlRelease', osc2.amlRelease],
	    	['osc2_ameDelayBPM', 'osc2_ameDelay', osc2.ameDelay],
	    	['osc2_ameAttackBPM', 'osc2_ameAttack', osc2.ameAttack],
	    	['osc2_ameReleaseBPM', 'osc2_ameRelease', osc2.ameRelease],
	    	['osc3_pmlBPM', 'osc3_pmlFreq', osc3.pmlFreq],
	    	['osc3_pmlDelayBPM', 'osc3_pmlDelay', osc3.pmlDelay],
	    	['osc3_pmlAttackBPM', 'osc3_pmlAttack', osc3.pmlAttack],
	    	['osc3_pmlReleaseBPM', 'osc3_pmlRelease', osc3.pmlRelease],
	    	['osc3_pmeDelayBPM', 'osc3_pmeDelay', osc3.pmeDelay],
	    	['osc3_pmeAttackBPM', 'osc3_pmeAttack', osc3.pmeAttack],
	    	['osc3_pmeReleaseBPM', 'osc3_pmeRelease', osc3.pmeRelease],
	    	['osc3_amlBPM', 'osc3_amlFreq', osc3.amlFreq],
	    	['osc3_amlDelayBPM', 'osc3_amlDelay', osc3.amlDelay],
	    	['osc3_amlAttackBPM', 'osc3_amlAttack', osc3.amlAttack],
	    	['osc3_amlReleaseBPM', 'osc3_amlRelease', osc3.amlRelease],
	    	['osc3_ameDelayBPM', 'osc3_ameDelay', osc3.ameDelay],
	    	['osc3_ameAttackBPM', 'osc3_ameAttack', osc3.ameAttack],
	    	['osc3_ameReleaseBPM', 'osc3_ameRelease', osc3.ameRelease]
	    ];
    	
		for (var i = 0; i < bpmChange.length; i++) {						
			if (patch[bpmChange[i][0]] != "off") {
	    		if (bpmChange[i][2].classList.contains('freq')){
	    			var newFreq = Number(patch.bpm) / Number(patch[bpmChange[i][0]]);
	    		} else {
	    			var newFreq = Number(patch[bpmChange[i][0]]) / Number(patch.bpm);
	    		}
	    		newFreq = +newFreq.toFixed(4);
	    		patch[bpmChange[i][1]] = newFreq;
	    		bpmChange[i][2].value = newFreq;
	    		if (bpmChange[i][2].nextElementSibling.nextElementSibling.classList.contains('log')){
	    		
	    			var lo = bpmChange[i][2].nextElementSibling.nextElementSibling.getAttribute("data-lo");
	    			var hi = bpmChange[i][2].nextElementSibling.nextElementSibling.getAttribute("data-hi");
	    			var dataResult = valueToLogSlide(lo, hi, patch[bpmChange[i][1]]);
	    			bpmChange[i][2].nextElementSibling.nextElementSibling.value = dataResult;
	    			
	    		} else {bpmChange[i][2].nextElementSibling.nextElementSibling.value = newFreq}
				
	    	}
			
		}
    	
    	osc1_pulselfo.frequency.value = patch.osc1_pulselFreq;
    	osc1_pmlfo.frequency.value = patch.osc1_pmlFreq;
    	osc1_amlfo.frequency.value = patch.osc1_amlFreq;
    	osc2_pulselfo.frequency.value = patch.osc2_pulselFreq;
    	osc2_pmlfo.frequency.value = patch.osc2_pmlFreq;
    	osc2_amlfo.frequency.value = patch.osc2_amlFreq;
    	osc3_pulselfo.frequency.value = patch.osc3_pulselFreq;
    	osc3_pmlfo.frequency.value = patch.osc3_pmlFreq;
    	osc3_amlfo.frequency.value = patch.osc3_amlFreq;

    	
    	if(patch.flt1_lBPM != "off"){
    		var newFreq = Number(patch.bpm) / Number(patch.flt1_lBPM);
    		patch["flt1_lFreq"] = newFreq;
    		$('#flt1lFreq').val(newFreq);
    		var dataResult = valueToLogSlide(.1,20,patch.flt1_lFreq);
    		$('#flt1lFreq').next().next().val(dataResult);
    		flt1_pmlfo.frequency.value = patch.flt1_lFreq;
    	}
    	if(patch.flt1_lDelayBPM != "off"){
    		var newFreq = Number(patch.flt1_lDelayBPM) / Number(patch.bpm);
    		patch["flt1_lDelay"] = newFreq;
    		$('#flt1lDelay').val(newFreq);
    		$('#flt1lDelay').next().next().val(newFreq);
    	}
    	if(patch.flt1_lAttackBPM != "off"){
    		var newFreq = Number(patch.flt1_lAttackBPM) / Number(patch.bpm);
    		patch["flt1_lAttack"] = newFreq;
    		$('#flt1lAttack').val(newFreq);
    		$('#flt1lAttack').next().next().val(newFreq);
    	}
    	if(patch.flt1_lReleaseBPM != "off"){
    		var newFreq = Number(patch.flt1_lReleaseBPM) / Number(patch.bpm);
    		patch["flt1_lRelease"] = newFreq;
    		$('#flt1lRelease').val(newFreq);
    		$('#flt1lRelease').next().next().val(newFreq);
    	}
    	if(patch.flt1_eAttackBPM != "off"){
    		var newFreq = Number(patch.flt1_eAttackBPM) / Number(patch.bpm);
    		patch["flt1_eAttack"] = newFreq;
    		$('#flt1eAttack').val(newFreq);
    		$('#flt1eAttack').next().next().val(newFreq);
    	}
    	if(patch.flt1_eReleaseBPM != "off"){
    		var newFreq = Number(patch.flt1_eReleaseBPM) / Number(patch.bpm);
    		patch["flt1_eRelease"] = newFreq;
    		$('#flt1eRelease').val(newFreq);
    		$('#flt1eRelease').next().next().val(newFreq);
    	}
    	
    	if(patch.flt2_lBPM != "off"){
    		var newFreq = Number(patch.bpm) / Number(patch.flt2_lBPM);
    		patch["flt2_lFreq"] = newFreq;
    		$('#flt2lFreq').val(newFreq);
    		var dataResult = valueToLogSlide(.1,20,patch.flt2_lFreq);
    		$('#flt2lFreq').next().next().val(dataResult);
    		flt2_pmlfo.frequency.value = patch.flt2_lFreq;
    	}
    	if(patch.flt2_lDelayBPM != "off"){
    		var newFreq = Number(patch.flt2_lDelayBPM) / Number(patch.bpm);
    		patch["flt2_lDelay"] = newFreq;
    		$('#flt2lDelay').val(newFreq);
    		$('#flt2lDelay').next().next().val(newFreq);
    	}
    	if(patch.flt2_lAttackBPM != "off"){
    		var newFreq = Number(patch.flt2_lAttackBPM) / Number(patch.bpm);
    		patch["flt2_lAttack"] = newFreq;
    		$('#flt2lAttack').val(newFreq);
    		$('#flt2lAttack').next().next().val(newFreq);
    	}
    	if(patch.flt2_lReleaseBPM != "off"){
    		var newFreq = Number(patch.flt2_lReleaseBPM) / Number(patch.bpm);
    		patch["flt2_lRelease"] = newFreq;
    		$('#flt2lRelease').val(newFreq);
    		$('#flt2lRelease').next().next().val(newFreq);
    	}
    	if(patch.flt2_eAttackBPM != "off"){
    		var newFreq = Number(patch.flt2_eAttackBPM) / Number(patch.bpm);
    		patch["flt2_eAttack"] = newFreq;
    		$('#flt2eAttack').val(newFreq);
    		$('#flt2eAttack').next().next().val(newFreq);
    	}
    	if(patch.flt2_eReleaseBPM != "off"){
    		var newFreq = Number(patch.flt2_eReleaseBPM) / Number(patch.bpm);
    		patch["flt2_eRelease"] = newFreq;
    		$('#flt2eRelease').val(newFreq);
    		$('#flt2eRelease').next().next().val(newFreq);
    	}
    	
    	if(patch.ae_attackTimeBPM != "off"){
    		var newFreq = Number(patch.ae_attackTimeBPM) / Number(patch.bpm);
    		patch["ae_attackTime"] = newFreq;
    		$('#ampEnvAttackTime').val(newFreq);
    		$('#ampEnvAttackTime').next().next().val(newFreq);
    	}
    	if(patch.ae_attackPart1TimeBPM != "off"){
    		var newFreq = Number(patch.ae_attackPart1TimeBPM) / Number(patch.bpm);
    		patch["ae_attackPart1Time"] = newFreq;
    		$('#ampEnvAttackPart1Time').val(newFreq);
    		$('#ampEnvAttackPart1Time').next().next().val(newFreq);
    	}
    	if(patch.ae_attackPart2TimeBPM != "off"){
    		var newFreq = Number(patch.ae_attackPart2TimeBPM) / Number(patch.bpm);
    		patch["ae_attackPart2Time"] = newFreq;
    		$('#ampEnvAttackPart2Time').val(newFreq);
    		$('#ampEnvAttackPart2Time').next().next().val(newFreq);
    	}
    	if(patch.ae_decayTimeBPM != "off"){
    		var newFreq = Number(patch.ae_decayTimeBPM) / Number(patch.bpm);
    		patch["ae_decayTime"] = newFreq;
    		$('#ampEnvDecay').val(newFreq);
    		$('#ampEnvDecay').next().next().val(newFreq);
    	}
    	if(patch.ae_sustainTimeBPM != "off"){
    		var newFreq = Number(patch.ae_sustainTimeBPM) / Number(patch.bpm);
    		patch["ae_sustainMaxTime"] = newFreq;
    		$('#ampEnvSustainTimeMax').val(newFreq);
    		$('#ampEnvSustainTimeMax').next().next().val(newFreq);
    	}
    	if(patch.ae_holdTimeBPM != "off"){
    		var newFreq = Number(patch.ae_holdTimeBPM) / Number(patch.bpm);
    		patch["ae_holdTime"] = newFreq;
    		$('#ampEnvHold').val(newFreq);
    		$('#ampEnvHold').next().next().val(newFreq);
    	}
    	if(patch.ae_releaseTimeBPM != "off"){
    		var newFreq = Number(patch.ae_releaseTimeBPM) / Number(patch.bpm);
    		patch["ae_releaseTime"] = newFreq;
    		$('#ampEnvReleaseTime').val(newFreq);
    		$('#ampEnvReleaseTime').next().next().val(newFreq);
    	}
    	if(patch.ae_releasePart1TimeBPM != "off"){
    		var newFreq = Number(patch.ae_releasePart1TimeBPM) / Number(patch.bpm);
    		patch["ae_releasePart1Time"] = newFreq;
    		$('#ampEnvReleasePart1Time').val(newFreq);
    		$('#ampEnvReleasePart1Time').next().next().val(newFreq);
    	}
    	if(patch.ae_releasePart2TimeBPM != "off"){
    		var newFreq = Number(patch.ae_releasePart2TimeBPM) / Number(patch.bpm);
    		patch["ae_releasePart2Time"] = newFreq;
    		$('#ampEnvReleasePart2Time').val(newFreq);
    		$('#ampEnvReleasePart2Time').next().next().val(newFreq);
    	}
    	if(patch.ae_releasePart3TimeBPM != "off"){
    		var newFreq = Number(patch.ae_releasePart3TimeBPM) / Number(patch.bpm);
    		patch["ae_releasePart3Time"] = newFreq;
    		$('#ampEnvReleasePart3Time').val(newFreq);
    		$('#ampEnvReleasePart3Time').next().next().val(newFreq);
    	}
    	
    	if(patch.tremolo_rateBPM != "off"){
    		var newFreq =  Number(patch.bpm) / Number(patch.tremolo_rateBPM);
    		patch["tremolo_rate"] = newFreq;
    		$('#tremoloRate').val(newFreq);
    		$('#tremoloRate').next().next().val(newFreq);
    	}
    	
    	if(patch.delay_timeBPM != "off"){
    		var newFreq = Number(patch.delay_timeBPM) / Number(patch.bpm);
    		patch["delay_time"] = newFreq;
    		$('#delayTime').val(newFreq);
    		$('#delayTime').next().next().val(newFreq);
    	}
    	if(patch.dualDelay_TimeABPM != "off"){
    		var newFreq = Number(patch.dualDelay_TimeABPM) / Number(patch.bpm);
    		patch["dualDelay_TimeA"] = newFreq;
    		$('#ddTimeA').val(newFreq);
    		$('#ddTimeA').next().next().val(newFreq);
    	}
    	if(patch.dualDelay_TimeBBPM != "off"){
    		var newFreq = Number(patch.dualDelay_TimeBBPM) / Number(patch.bpm);
    		patch["dualDelay_TimeB"] = newFreq;
    		$('#ddTimeB').val(newFreq);
    		$('#ddTimeB').next().next().val(newFreq);
    	}
    	
    	if(patch.reverbDelayBPM != "off"){
    		var newFreq = Number(patch.reverbDelayBPM) / Number(patch.bpm);
    		patch["reverbDelay"] = newFreq;
    		$('#reverbDelay').val(newFreq);
    		$('#reverbDelay').next().next().val(newFreq);
    	}
    	
 		
    });
    
    // When a parameter assigned from 'bpm-based frequency' is changed, turn off 'bpm-based frequency'

    var bpmOffParams = [
    	['osc1_pulselFreqP', osc1.pulselBPM, 'osc1_pulselBPM'],
    	['osc1_pulselDelayP', osc1.pulselDelayBPM, 'osc1_pulselDelayBPM'],
    	['osc1_pulselAttackP', osc1.pulselAttackBPM, 'osc1_pulselAttackBPM'],
    	['osc1_pulselReleaseP', osc1.pulselReleaseBPM, 'osc1_pulselReleaseBPM'],
    	['osc2_pulselFreqP', osc2.pulselBPM, 'osc2_pulselBPM'],
    	['osc2_pulselDelayP', osc2.pulselDelayBPM, 'osc2_pulselDelayBPM'],
    	['osc2_pulselAttackP', osc2.pulselAttackBPM, 'osc2_pulselAttackBPM'],
    	['osc2_pulselReleaseP', osc2.pulselReleaseBPM, 'osc2_pulselReleaseBPM'],
    	['osc3_pulselFreqP', osc3.pulselBPM, 'osc3_pulselBPM'],
    	['osc3_pulselDelayP', osc3.pulselDelayBPM, 'osc3_pulselDelayBPM'],
    	['osc3_pulselAttackP', osc3.pulselAttackBPM, 'osc3_pulselAttackBPM'],
    	['osc3_pulselReleaseP', osc3.pulselReleaseBPM, 'osc3_pulselReleaseBPM'],
    	['osc1_pmlFreqP', osc1.pmlBPM, 'osc1_pmlBPM'],
    	['osc1_pmlDelayP', osc1.pmlDelayBPM, 'osc1_pmlDelayBPM'],
    	['osc1_pmlAttackP', osc1.pmlAttackBPM, 'osc1_pmlAttackBPM'],
    	['osc1_pmlReleaseP', osc1.pmlReleaseBPM, 'osc1_pmlReleaseBPM'],
    	['osc1_pmeDelayP', osc1.pmeDelayBPM, 'osc1_pmeDelayBPM'],
    	['osc1_pmeAttackP', osc1.pmeAttackBPM, 'osc1_pmeAttackBPM'],
    	['osc1_pmeReleaseP', osc1.pmeReleaseBPM, 'osc1_pmeReleaseBPM'],
    	['osc1_amlFreqP', osc1.amlBPM, 'osc1_amlBPM'],
    	['osc1_amlDelayP', osc1.amlDelayBPM, 'osc1_amlDelayBPM'],
    	['osc1_amlAttackP', osc1.amlAttackBPM, 'osc1_amlAttackBPM'],
    	['osc1_amlReleaseP', osc1.amlReleaseBPM, 'osc1_amlReleaseBPM'],
    	['osc1_ameDelayP', osc1.ameDelayBPM, 'osc1_ameDelayBPM'],
    	['osc1_ameAttackP', osc1.ameAttackBPM, 'osc1_ameAttackBPM'],
    	['osc1_ameReleaseP', osc1.ameReleaseBPM, 'osc1_ameReleaseBPM'],
    	['osc2_pmlFreqP', osc2.pmlBPM, 'osc2_pmlBPM'],
    	['osc2_pmlDelayP', osc2.pmlDelayBPM, 'osc2_pmlDelayBPM'],
    	['osc2_pmlAttackP', osc2.pmlAttackBPM, 'osc2_pmlAttackBPM'],
    	['osc2_pmlReleaseP', osc2.pmlReleaseBPM, 'osc2_pmlReleaseBPM'],
    	['osc2_pmeDelayP', osc2.pmeDelayBPM, 'osc2_pmeDelayBPM'],
    	['osc2_pmeAttackP', osc2.pmeAttackBPM, 'osc2_pmeAttackBPM'],
    	['osc2_pmeReleaseP', osc2.pmeReleaseBPM, 'osc2_pmeReleaseBPM'],
    	['osc2_amlFreqP', osc2.amlBPM, 'osc2_amlBPM'],
    	['osc2_amlDelayP', osc2.amlDelayBPM, 'osc2_amlDelayBPM'],
    	['osc2_amlAttackP', osc2.amlAttackBPM, 'osc2_amlAttackBPM'],
    	['osc2_amlReleaseP', osc2.amlReleaseBPM, 'osc2_amlReleaseBPM'],
    	['osc2_ameDelayP', osc2.ameDelayBPM, 'osc2_ameDelayBPM'],
    	['osc2_ameAttackP', osc2.ameAttackBPM, 'osc2_ameAttackBPM'],
    	['osc2_ameReleaseP', osc2.ameReleaseBPM, 'osc2_ameReleaseBPM'],
    	['osc3_pmlFreqP', osc3.pmlBPM, 'osc3_pmlBPM'],
    	['osc3_pmlDelayP', osc3.pmlDelayBPM, 'osc3_pmlDelayBPM'],
    	['osc3_pmlAttackP', osc3.pmlAttackBPM, 'osc3_pmlAttackBPM'],
    	['osc3_pmlReleaseP', osc3.pmlReleaseBPM, 'osc3_pmlReleaseBPM'],
    	['osc3_pmeDelayP', osc3.pmeDelayBPM, 'osc3_pmeDelayBPM'],
    	['osc3_pmeAttackP', osc3.pmeAttackBPM, 'osc3_pmeAttackBPM'],
    	['osc3_pmeReleaseP', osc3.pmeReleaseBPM, 'osc3_pmeReleaseBPM'],
    	['osc3_amlFreqP', osc3.amlBPM, 'osc3_amlBPM'],
    	['osc3_amlDelayP', osc3.amlDelayBPM, 'osc3_amlDelayBPM'],
    	['osc3_amlAttackP', osc3.amlAttackBPM, 'osc3_amlAttackBPM'],
    	['osc3_amlReleaseP', osc3.amlReleaseBPM, 'osc3_amlReleaseBPM'],
    	['osc3_ameDelayP', osc3.ameDelayBPM, 'osc3_ameDelayBPM'],
    	['osc3_ameAttackP', osc3.ameAttackBPM, 'osc3_ameAttackBPM'],
    	['osc3_ameReleaseP', osc3.ameReleaseBPM, 'osc3_ameReleaseBPM']
    ];
    
    var bpmOff = function(guiParam, patchParam) {
        guiParam.value = 'off';
    	patch[patchParam] = 'off';
    };
    
    for(var bop=0; bop<bpmOffParams.length; bop++){
        
	    var bpmOffClass = document.getElementsByClassName(bpmOffParams[bop][0]);
	
	    for(var i=0;i<bpmOffClass.length;i++){
	        bpmOffClass[i].addEventListener('change', bpmOff.bind(null, bpmOffParams[bop][1], bpmOffParams[bop][2]), false);
	    };
	};

    
    $('.flt1lFreqP').change(function() {
    	$('#flt1lBPM').val("off");
    	patch["flt1_lBPM"] = "off";
    });
    $('.flt1lDelayP').change(function() {
    	$('#flt1lDelayBPM').val("off"); 
    	patch["flt1_lDelayBPM"] = "off";
    });
    $('.flt1lAttackP').change(function() {
    	$('#flt1lAttackBPM').val("off"); 
    	patch["flt1_lAttackBPM"] = "off";
    });
    $('.flt1lReleaseP').change(function() {
    	$('#flt1lReleaseBPM').val("off"); 
    	patch["flt1_lReleaseBPM"] = "off";
    });
    $('.flt1eAttackP').change(function() {
    	$('#flt1eAttackBPM').val("off");
    	patch["flt1_eAttackBPM"] = "off";
    });
    $('.flt1eReleaseP').change(function() {
    	$('#flt1eReleaseBPM').val("off");
    	patch["flt1_eReleaseBPM"] = "off";
    });
    $('.flt2lFreqP').change(function() {
    	$('#flt2lBPM').val("off");
    	patch["flt2_lBPM"] = "off";
    });
    $('.flt2lDelayP').change(function() {
    	$('#flt2lDelayBPM').val("off"); 
    	patch["flt2_lDelayBPM"] = "off";
    });
    $('.flt2lAttackP').change(function() {
    	$('#flt2lAttackBPM').val("off"); 
    	patch["flt2_lAttackBPM"] = "off";
    });
    $('.flt2lReleaseP').change(function() {
    	$('#flt2lReleaseBPM').val("off"); 
    	patch["flt2_lReleaseBPM"] = "off";
    });
    $('.flt2eAttackP').change(function() {
    	$('#flt2eAttackBPM').val("off");
    	patch["flt2_eAttackBPM"] = "off";
    });
    $('.flt2eReleaseP').change(function() {
    	$('#flt2eReleaseBPM').val("off");
    	patch["flt2_eReleaseBPM"] = "off";
    });
    
    
    
    $('.ampEnvAttackPart1TimeP').change(function() {
    	$('#ampEnvAttackPart1TimeBPM').val("off");
    	patch["ae_attackPart1TimeBPM"] = "off";
    });
    
    $('.ampEnvAttackTimeP').change(function() {
    	$('#ampEnvAttackTimeBPM').val("off");
    	patch["ae_attackTimeBPM"] = "off";
    });
    
    $('.ampEnvAttackPart2TimeP').change(function() {
    	$('#ampEnvAttackPart2TimeBPM').val("off");
    	patch["ae_attackPart2TimeBPM"] = "off";
    });
    
    $('.ampEnvDecayP').change(function() {
    	$('#ampEnvDecayTimeBPM').val("off");
    	patch["ae_decayTimeBPM"] = "off";
    });
    
    $('.ampEnvSustainMaxTimeP').change(function() {
    	$('#ampEnvSustainMaxTimeBPM').val("off");
    	patch["ae_sustainTimeBPM"] = "off";
    });
    
    $('.ampEnvHoldP').change(function() {
    	$('#ampEnvHoldBPM').val("off");
    	patch["ae_holdTimeBPM"] = "off";
    });
    
    $('.ampEnvReleaseTimeP').change(function() {
    	$('#ampEnvReleaseTimeBPM').val("off");
    	patch["ae_releaseTimeBPM"] = "off";
    });
    
    $('.ampEnvReleasePart1TimeP').change(function() {
    	$('#ampEnvReleasePart1TimeBPM').val("off");
    	patch["ae_releasePart1TimeBPM"] = "off";
    });
    
    $('.ampEnvReleasePart2TimeP').change(function() {
    	$('#ampEnvReleasePart2TimeBPM').val("off");
    	patch["ae_releasePart2TimeBPM"] = "off";
    });
    
    $('.ampEnvReleasePart3TimeP').change(function() {
    	$('#ampEnvReleasePart3TimeBPM').val("off");
    	patch["ae_releasePart3TimeBPM"] = "off";
    });
    
    $('.tremoloRateP').change(function() {
    	$('#tremoloRateBPM').val("off");
    	patch["tremolo_rateBPM"] = "off";
    });
    
    $('.delayTimeP').change(function() {
    	$('#delayTimeBPM').val("off");
    	patch["delay_timeBPM"] = "off";
    });
    
    $('.ddTimeAP').change(function() {
    	$('#ddTimeABPM').val("off");
    	patch["dualDelay_TimeABPM"] = "off";
    });
    
    $('.ddTimeBP').change(function() {
    	$('#ddTimeBBPM').val("off");
    	patch["dualDelay_TimeBBPM"] = "off";
    });
    
    $('.reverbDelayP').change(function() {
    	$('#reverbDelayBPM').val("off");
    	patch["reverbDelayBPM"] = "off";
    });
    
    
    // IF BPM-BASED FREQUENCY DROP-DOWN IS CHANGED, CHANGE THE APPROPRIATE PATCH PARAMETERS AND GUI SETTINGS
	
	var bpmBaseParams = [ 
		// guiBPM, patchBPMParam Name, guiParam, patchParam Name
    	[osc1.pulselBPM, 'osc1_pulselBPM', osc1.pulselFreq, 'osc1_pulselFreq'],
    	[osc1.pulselDelayBPM, 'osc1_pulselDelayBPM', osc1.pulselDelay, 'osc1_pulselDelay'],
    	[osc1.pulselAttackBPM, 'osc1_pulselAttackBPM', osc1.pulselAttack, 'osc1_pulselAttack'],
    	[osc1.pulselReleaseBPM, 'osc1_pulselReleaseBPM', osc1.pulselRelease, 'osc1_pulselRelease'],
    	
    	[osc1.pmlBPM, 'osc1_pmlBPM', osc1.pmlFreq, 'osc1_pmlFreq'],
    	[osc1.pmlDelayBPM, 'osc1_pmlDelayBPM', osc1.pmlDelay, 'osc1_pmlDelay'],
    	[osc1.pmlAttackBPM, 'osc1_pmlAttackBPM', osc1.pmlAttack, 'osc1_pmlAttack'],
    	[osc1.pmlReleaseBPM, 'osc1_pmlReleaseBPM', osc1.pmlRelease, 'osc1_pmlRelease'],
    	[osc1.pmeDelayBPM, 'osc1_pmeDelayBPM', osc1.pmeDelay, 'osc1_pmeDelay'],
    	[osc1.pmeAttackBPM, 'osc1_pmeAttackBPM', osc1.pmeAttack, 'osc1_pmeAttack'],
    	[osc1.pmeReleaseBPM, 'osc1_pmeReleaseBPM', osc1.pmeRelease, 'osc1_pmeRelease'],
    	[osc1.amlBPM, 'osc1_amlBPM', osc1.amlFreq, 'osc1_amlFreq'],
    	[osc1.amlDelayBPM, 'osc1_amlDelayBPM', osc1.amlDelay, 'osc1_amlDelay'],
    	[osc1.amlAttackBPM, 'osc1_amlAttackBPM', osc1.amlAttack, 'osc1_amlAttack'],
    	[osc1.amlReleaseBPM, 'osc1_amlReleaseBPM', osc1.amlRelease, 'osc1_amlRelease'],
    	[osc1.ameDelayBPM, 'osc1_ameDelayBPM', osc1.ameDelay, 'osc1_ameDelay'],
    	[osc1.ameAttackBPM, 'osc1_ameAttackBPM', osc1.ameAttack, 'osc1_ameAttack'],
    	[osc1.ameReleaseBPM, 'osc1_ameReleaseBPM', osc1.ameRelease, 'osc1_ameRelease'],
    	[osc2.pmlBPM, 'osc2_pmlBPM', osc2.pmlFreq, 'osc2_pmlFreq'],
    	[osc2.pmlDelayBPM, 'osc2_pmlDelayBPM', osc2.pmlDelay, 'osc2_pmlDelay'],
    	[osc2.pmlAttackBPM, 'osc2_pmlAttackBPM', osc2.pmlAttack, 'osc2_pmlAttack'],
    	[osc2.pmlReleaseBPM, 'osc2_pmlReleaseBPM', osc2.pmlRelease, 'osc2_pmlRelease'],
    	[osc2.pmeDelayBPM, 'osc2_pmeDelayBPM', osc2.pmeDelay, 'osc2_pmeDelay'],
    	[osc2.pmeAttackBPM, 'osc2_pmeAttackBPM', osc2.pmeAttack, 'osc2_pmeAttack'],
    	[osc2.pmeReleaseBPM, 'osc2_pmeReleaseBPM', osc2.pmeRelease, 'osc2_pmeRelease'],
    	[osc2.amlBPM, 'osc2_amlBPM', osc2.amlFreq, 'osc2_amlFreq'],
    	[osc2.amlDelayBPM, 'osc2_amlDelayBPM', osc2.amlDelay, 'osc2_amlDelay'],
    	[osc2.amlAttackBPM, 'osc2_amlAttackBPM', osc2.amlAttack, 'osc2_amlAttack'],
    	[osc2.amlReleaseBPM, 'osc2_amlReleaseBPM', osc2.amlRelease, 'osc2_amlRelease'],
    	[osc2.ameDelayBPM, 'osc2_ameDelayBPM', osc2.ameDelay, 'osc2_ameDelay'],
    	[osc2.ameAttackBPM, 'osc2_ameAttackBPM', osc2.ameAttack, 'osc2_ameAttack'],
    	[osc2.ameReleaseBPM, 'osc2_ameReleaseBPM', osc2.ameRelease, 'osc2_ameRelease'],
    	[osc3.pmlBPM, 'osc3_pmlBPM', osc3.pmlFreq, 'osc3_pmlFreq'],
    	[osc3.pmlDelayBPM, 'osc3_pmlDelayBPM', osc3.pmlDelay, 'osc3_pmlDelay'],
    	[osc3.pmlAttackBPM, 'osc3_pmlAttackBPM', osc3.pmlAttack, 'osc3_pmlAttack'],
    	[osc3.pmlReleaseBPM, 'osc3_pmlReleaseBPM', osc3.pmlRelease, 'osc3_pmlRelease'],
    	[osc3.pmeDelayBPM, 'osc3_pmeDelayBPM', osc3.pmeDelay, 'osc3_pmeDelay'],
    	[osc3.pmeAttackBPM, 'osc3_pmeAttackBPM', osc3.pmeAttack, 'osc3_pmeAttack'],
    	[osc3.pmeReleaseBPM, 'osc3_pmeReleaseBPM', osc3.pmeRelease, 'osc3_pmeRelease'],
    	[osc3.amlBPM, 'osc3_amlBPM', osc3.amlFreq, 'osc3_amlFreq'],
    	[osc3.amlDelayBPM, 'osc3_amlDelayBPM', osc3.amlDelay, 'osc3_amlDelay'],
    	[osc3.amlAttackBPM, 'osc3_amlAttackBPM', osc3.amlAttack, 'osc3_amlAttack'],
    	[osc3.amlReleaseBPM, 'osc3_amlReleaseBPM', osc3.amlRelease, 'osc3_amlRelease'],
    	[osc3.ameDelayBPM, 'osc3_ameDelayBPM', osc3.ameDelay, 'osc3_ameDelay'],
    	[osc3.ameAttackBPM, 'osc3_ameAttackBPM', osc3.ameAttack, 'osc3_ameAttack'],
    	[osc3.ameReleaseBPM, 'osc3_ameReleaseBPM', osc3.ameRelease, 'osc3_ameRelease']
    ];
    
    var bpmChange = function(guiBPM, patchBPMParam, guiParam, patchParam) {
        patch[patchBPMParam] = guiBPM.value;
        if(patch[patchBPMParam] != 'off'){
        	if (guiParam.classList.contains('freq')){
    			var newFreq = Number(patch.bpm) / Number(patch[patchBPMParam]);
    		} else {
    			var newFreq = Number(patch[patchBPMParam]) / Number(patch.bpm);
    		}
    		patch[patchParam] = newFreq;
    		guiParam.value = newFreq;
    		if (guiParam.nextElementSibling.nextElementSibling.classList.contains('log')){
    			var lo = guiParam.nextElementSibling.nextElementSibling.getAttribute("data-lo");
    			var hi = guiParam.nextElementSibling.nextElementSibling.getAttribute("data-hi");
    			var dataResult = valueToLogSlide(lo, hi, newFreq);
    			guiParam.nextElementSibling.nextElementSibling.value = dataResult;
    		} else {
    			guiParam.nextElementSibling.nextElementSibling.value = newFreq
    		}
        }
        
        osc1_pmlfo.frequency.value = patch.osc1_pmlFreq;
        osc1_amlfo.frequency.value = patch.osc1_amlFreq;
        osc2_pmlfo.frequency.value = patch.osc2_pmlFreq;
        osc2_amlfo.frequency.value = patch.osc2_amlFreq;
        osc3_pmlfo.frequency.value = patch.osc3_pmlFreq;
        osc3_amlfo.frequency.value = patch.osc3_amlFreq;
    };
    
    for(var i=0; i<bpmBaseParams.length; i++){
		document.getElementById(bpmBaseParams[i][1]).addEventListener('change', bpmChange.bind(null, bpmBaseParams[i][0], bpmBaseParams[i][1], bpmBaseParams[i][2], bpmBaseParams[i][3], bpmBaseParams[i][4]), false);
	};

    
    $('#flt1lBPM').change(function() {
    	if(patch.flt1_lBPM != "off"){
    		var newFreq = Number(patch.bpm) / Number(patch.flt1_lBPM);
    		patch["flt1_lFreq"] = newFreq;
    		$('#flt1lFreq').val(newFreq);
    		var dataResult = valueToLogSlide(.1,20,patch.flt1_lFreq);
    		$('#flt1lFreq').next().next().val(dataResult);
    		flt1_pmlfo.frequency.value = patch.flt1_lFreq;
    	}
    });
    
    $('#flt1lDelayBPM').change(function() {
    	patch["flt1_lDelayBPM"] = $('#flt1lDelayBPM').val();
    	if(patch.flt1_lDelayBPM != "off"){
    		var newFreq =  Number(patch.flt1_lDelayBPM) / Number(patch.bpm);
    		patch["flt1_lDelay"] = newFreq;
    		$('#flt1lDelay').val(newFreq);
    		$('#flt1lDelay').next().next().val(newFreq);
    	}
    });
    
    $('#flt1lAttackBPM').change(function() {
    	patch["flt1_lAttackBPM"] = $('#flt1lAttackBPM').val();
    	if(patch.flt1_lAttackBPM != "off"){
    		var newFreq =  Number(patch.flt1_lAttackBPM) / Number(patch.bpm);
    		patch["flt1_lAttack"] = newFreq;
    		$('#flt1lAttack').val(newFreq);
    		$('#flt1lAttack').next().next().val(newFreq);
    	}
    });
    
    $('#flt1lReleaseBPM').change(function() {
    	patch["flt1_lReleaseBPM"] = $('#flt1lReleaseBPM').val();
    	if(patch.flt1_lReleaseBPM != "off"){
    		var newFreq =  Number(patch.flt1_lReleaseBPM) / Number(patch.bpm);
    		patch["flt1_lRelease"] = newFreq;
    		$('#flt1lRelease').val(newFreq);
    		$('#flt1lRelease').next().next().val(newFreq);
    	}
    });
    
    $('#flt1eAttackBPM').change(function() {
    	patch["flt1_eAttackBPM"] = $('#flt1eAttackBPM').val();
    	if(patch.flt1_eAttackBPM != "off"){
    		var newFreq =  Number(patch.flt1_eAttackBPM) / Number(patch.bpm);
    		patch["flt1_eAttack"] = newFreq;
    		$('#flt1eAttack').val(newFreq);
    		$('#flt1eAttack').next().next().val(newFreq);
    	}
    });
    
    $('#flt1eReleaseBPM').change(function() {
    	patch["flt1_eReleaseBPM"] = $('#flt1eReleaseBPM').val();
    	if(patch.flt1_eReleaseBPM != "off"){
    		var newFreq =  Number(patch.flt1_eReleaseBPM) / Number(patch.bpm);
    		patch["flt1_eRelease"] = newFreq;
    		$('#flt1eRelease').val(newFreq);
    		$('#flt1eRelease').next().next().val(newFreq);
    	}
    });
    
    $('#flt2lBPM').change(function() {
    	if(patch.flt2_lBPM != "off"){
    		var newFreq = Number(patch.bpm) / Number(patch.flt2_lBPM);
    		patch["flt2_lFreq"] = newFreq;
    		$('#flt2lFreq').val(newFreq);
    		var dataResult = valueToLogSlide(.1,20,patch.flt2_lFreq);
    		$('#flt2lFreq').next().next().val(dataResult);
    		flt2_pmlfo.frequency.value = patch.flt2_lFreq;
    	}
    });
    
    $('#flt2lDelayBPM').change(function() {
    	patch["flt2_lDelayBPM"] = $('#flt2lDelayBPM').val();
    	if(patch.flt2_lDelayBPM != "off"){
    		var newFreq =  Number(patch.flt2_lDelayBPM) / Number(patch.bpm);
    		patch["flt2_lDelay"] = newFreq;
    		$('#flt2lDelay').val(newFreq);
    		$('#flt2lDelay').next().next().val(newFreq);
    	}
    });
    
    $('#flt2lAttackBPM').change(function() {
    	patch["flt2_lAttackBPM"] = $('#flt2lAttackBPM').val();
    	if(patch.flt2_lAttackBPM != "off"){
    		var newFreq =  Number(patch.flt2_lAttackBPM) / Number(patch.bpm);
    		patch["flt2_lAttack"] = newFreq;
    		$('#flt2lAttack').val(newFreq);
    		$('#flt2lAttack').next().next().val(newFreq);
    	}
    });
    
    $('#flt2lReleaseBPM').change(function() {
    	patch["flt2_lReleaseBPM"] = $('#flt2lReleaseBPM').val();
    	if(patch.flt2_lReleaseBPM != "off"){
    		var newFreq =  Number(patch.flt2_lReleaseBPM) / Number(patch.bpm);
    		patch["flt2_lRelease"] = newFreq;
    		$('#flt2lRelease').val(newFreq);
    		$('#flt2lRelease').next().next().val(newFreq);
    	}
    });
    
    $('#flt2eAttackBPM').change(function() {
    	patch["flt2_eAttackBPM"] = $('#flt2eAttackBPM').val();
    	if(patch.flt2_eAttackBPM != "off"){
    		var newFreq =  Number(patch.flt2_eAttackBPM) / Number(patch.bpm);
    		patch["flt2_eAttack"] = newFreq;
    		$('#flt2eAttack').val(newFreq);
    		$('#flt2eAttack').next().next().val(newFreq);
    	}
    });
    
    $('#flt2eReleaseBPM').change(function() {
    	patch["flt2_eReleaseBPM"] = $('#flt2eReleaseBPM').val();
    	if(patch.flt2_eReleaseBPM != "off"){
    		var newFreq =  Number(patch.flt2_eReleaseBPM) / Number(patch.bpm);
    		patch["flt2_eRelease"] = newFreq;
    		$('#flt2eRelease').val(newFreq);
    		$('#flt2eRelease').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvAttackTimeBPM').change(function() {
    	if(patch.ae_attackTimeBPM != "off"){
    		var newFreq = Number(patch.ae_attackTimeBPM) / Number(patch.bpm);
    		patch["ae_attackTime"] = newFreq;
    		$('#ampEnvAttackTime').val(newFreq);
    		$('#ampEnvAttackTime').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvAttackPart1TimeBPM').change(function() {
    	if(patch.ae_attackPart1TimeBPM != "off"){
    		var newFreq = Number(patch.ae_attackPart1TimeBPM) / Number(patch.bpm);
    		patch["ae_attackPart1Time"] = newFreq;
    		$('#ampEnvAttackPart1Time').val(newFreq);
    		$('#ampEnvAttackPart1Time').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvAttackPart2TimeBPM').change(function() {
    	if(patch.ae_attackPart2TimeBPM != "off"){
    		var newFreq = Number(patch.ae_attackPart2TimeBPM) / Number(patch.bpm);
    		patch["ae_attackPart2Time"] = newFreq;
    		$('#ampEnvAttackPart2Time').val(newFreq);
    		$('#ampEnvAttackPart2Time').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvDecayTimeBPM').change(function() {
    	if(patch.ae_decayTimeBPM != "off"){
    		var newFreq = Number(patch.ae_decayTimeBPM) / Number(patch.bpm);
    		patch["ae_decayTime"] = newFreq;
    		$('#ampEnvDecay').val(newFreq);
    		$('#ampEnvDecay').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvSustainMaxTimeBPM').change(function() {
    	if(patch.ae_sustainTimeBPM != "off"){
    		var newFreq = Number(patch.ae_sustainTimeBPM) / Number(patch.bpm);
    		patch["ae_sustainMaxTime"] = newFreq;
    		$('#ampEnvSustainTimeMax').val(newFreq);
    		$('#ampEnvSustainTimeMax').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvHoldBPM').change(function() {
    	if(patch.ae_holdTimeBPM != "off"){
    		var newFreq = Number(patch.ae_holdTimeBPM) / Number(patch.bpm);
    		patch["ae_holdTime"] = newFreq;
    		$('#ampEnvHold').val(newFreq);
    		$('#ampEnvHold').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvReleaseTimeBPM').change(function() {
    	if(patch.ae_releaseTimeBPM != "off"){
    		var newFreq = Number(patch.ae_releaseTimeBPM) / Number(patch.bpm);
    		patch["ae_releaseTime"] = newFreq;
    		$('#ampEnvReleaseTime').val(newFreq);
    		$('#ampEnvReleaseTime').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvReleasePart1TimeBPM').change(function() {
    	if(patch.ae_releasePart1TimeBPM != "off"){
    		var newFreq = Number(patch.ae_releasePart1TimeBPM) / Number(patch.bpm);
    		patch["ae_releasePart1Time"] = newFreq;
    		$('#ampEnvReleasePart1Time').val(newFreq);
    		$('#ampEnvReleasePart1Time').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvReleasePart2TimeBPM').change(function() {
    	if(patch.ae_releasePart2TimeBPM != "off"){
    		var newFreq = Number(patch.ae_releasePart2TimeBPM) / Number(patch.bpm);
    		patch["ae_releasePart2Time"] = newFreq;
    		$('#ampEnvReleasePart2Time').val(newFreq);
    		$('#ampEnvReleasePart2Time').next().next().val(newFreq);
    	}
    });
    
    $('#ampEnvReleasePart3TimeBPM').change(function() {
    	if(patch.ae_releasePart3TimeBPM != "off"){
    		var newFreq = Number(patch.ae_releasePart3TimeBPM) / Number(patch.bpm);
    		patch["ae_releasePart3Time"] = newFreq;
    		$('#ampEnvReleasePart3Time').val(newFreq);
    		$('#ampEnvReleasePart3Time').next().next().val(newFreq);
    	}
    });
    
    
    $('#tremoloRateBPM').change(function() {
    	if(patch.tremolo_rateBPM != "off"){
    		var newFreq = Number(patch.bpm) / Number(patch.tremolo_rateBPM);
    		patch["tremolo_rate"] = newFreq;
    		$('#tremoloRate').val(newFreq);
    		$('#tremoloRate').next().next().val(newFreq);
    	}
    });
    
    $('#delayTimeBPM').change(function() {
    	if(patch.delayTimeBPM != "off"){
    		var newFreq = Number(patch.delay_timeBPM) / Number(patch.bpm);
    		patch["delay_time"] = newFreq;
    		$('#delayTime').val(newFreq);
    		$('#delayTime').next().next().val(newFreq);
    	}
    });
    
    $('#ddTimeABPM').change(function() {
    	if(patch.dualDelay_TimeABPM != "off"){
    		var newFreq = Number(patch.dualDelay_TimeABPM) / Number(patch.bpm);
    		patch["dualDelay_TimeA"] = newFreq;
    		$('#ddTimeA').val(newFreq);
    		$('#ddTimeA').next().next().val(newFreq);
    	}
    });
    
    $('#ddTimeBBPM').change(function() {
    	if(patch.dualDelay_TimeBBPM != "off"){
    		var newFreq = Number(patch.dualDelay_TimeBBPM) / Number(patch.bpm);
    		patch["dualDelay_TimeB"] = newFreq;
    		$('#ddTimeB').val(newFreq);
    		$('#ddTimeB').next().next().val(newFreq);
    	}
    });
    
    $('#reverbDelayBPM').change(function() {
    	if(patch.reverbDelayBPM != "off"){
    		var newFreq = Number(patch.reverbDelayBPM) / Number(patch.bpm);
    		patch["reverbDelay"] = newFreq;
    		$('#reverbDelay').val(newFreq);
    		$('#reverbDelay').next().next().val(newFreq);
    	}
    });
    
    
    // FILTER MATRIX PRESET CHANGES
    
    $('.fltMtxInp').change(function() {
    	$('#fltMtxPre').val('complex');
    });
    
    $('#fltMtxPre').change(function() {
    	if($('#fltMtxPre').val() == "serial"){
    		patch.fltMtx_oscsToF1 = 100;
    		$('#fltMtxo2f1').parent().children().val(100);
    		
	    	patch.fltMtx_oscsToF2 = 0;
	    	$('#fltMtxo2f2').parent().children().val(0);
	    	
	    	patch.fltMtx_oscsToVE = 0;
	    	$('#fltMtxo2ve').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToF2 = 100;
	    	$('#fltMtxf12f2').parent().children().val(100);
	    	
	    	patch.fltMtx_F1ToVE = 0;
	    	$('#fltMtxf12ve').parent().children().val(0);
	    	
	    	// patch.fltMtx_F2ToF1 = 0;
	    	// $('#fltMtxf22f1').parent().children().val(0);
	    	
	    	patch.fltMtx_F2ToVE = 100;
	    	$('#fltMtxf22ve').parent().children().val(100);
    	};
    	
    	if($('#fltMtxPre').val() == "parallel"){
    		patch.fltMtx_oscsToF1 = 100;
    		$('#fltMtxo2f1').parent().children().val(100);
    		
	    	patch.fltMtx_oscsToF2 = 100;
	    	$('#fltMtxo2f2').parent().children().val(100);
	    	
	    	patch.fltMtx_oscsToVE = 0;
	    	$('#fltMtxo2ve').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToF2 = 0;
	    	$('#fltMtxf12f2').parent().children().val(0);
	    	
	    	// patch.fltMtx_F2ToF1 = 0;
	    	// $('#fltMtxf22f1').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToVE = 50;
	    	$('#fltMtxf12ve').parent().children().val(50);
	    	
	    	patch.fltMtx_F2ToVE = 50;
	    	$('#fltMtxf22ve').parent().children().val(50);
    	}
    	
    	if($('#fltMtxPre').val() == "sf1"){
    		patch.fltMtx_oscsToF1 = 100;
    		$('#fltMtxo2f1').parent().children().val(100);
    		
	    	patch.fltMtx_oscsToF2 = 0;
	    	$('#fltMtxo2f2').parent().children().val(0);
	    	
	    	patch.fltMtx_oscsToVE = 0;
	    	$('#fltMtxo2ve').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToF2 = 0;
	    	$('#fltMtxf12f2').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToVE = 100;
	    	$('#fltMtxf12ve').parent().children().val(100);
	    	
	    	patch.fltMtx_F2To1 = 0;
	    	$('#fltMtxf22f1').parent().children().val(0);
	    	
	    	patch.fltMtx_F2ToVE = 0;
	    	$('#fltMtxf22ve').parent().children().val(0);
	    	
	    	patch.flt1_switch = "on";
	    	patch.flt2_switch = "off";
	    	
	    	$('#flt1').parent().addClass('on');
 			$('#flt1').parent().next().slideDown();
 			$('#flt2').parent().removeClass('on');
 			$('#flt2').parent().next().slideUp();
	    	
	    	
    	}

    	if($('#fltMtxPre').val() == "sf2"){
    		patch.fltMtx_oscsToF1 = 0;
    		$('#fltMtxo2f1').parent().children().val(0);
    		
	    	patch.fltMtx_oscsToF2 = 100;
	    	$('#fltMtxo2f2').parent().children().val(100);
	    	
	    	patch.fltMtx_oscsToVE = 0;
	    	$('#fltMtxo2ve').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToF2 = 0;
	    	$('#fltMtxf12f2').parent().children().val(0);
	    	
	    	// patch.fltMtx_F2ToF1 = 0;
	    	// $('#fltMtxf22f1').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToVE = 0;
	    	$('#fltMtxf12ve').parent().children().val(0);
	    	
	    	patch.fltMtx_F2ToVE = 100;
	    	$('#fltMtxf22ve').parent().children().val(100);
	    	
	    	patch.flt1_switch = "off";
	    	patch.flt2_switch = "on";
	    	
	    	$('#flt2').parent().addClass('on');
 			$('#flt2').parent().next().slideDown();
 			$('#flt1').parent().removeClass('on');
 			$('#flt1').parent().next().slideUp();
	    	
    	}

    	if($('#fltMtxPre').val() == "no"){
    		patch.fltMtx_oscsToF1 = 0;
    		$('#fltMtxo2f1').parent().children().val(0);
    		
	    	patch.fltMtx_oscsToF2 = 0;
	    	$('#fltMtxo2f2').parent().children().val(0);
	    	
	    	patch.fltMtx_oscsToVE = 100;
	    	$('#fltMtxo2ve').parent().children().val(100);
	    	
	    	patch.fltMtx_F1ToF2 = 0;
	    	$('#fltMtxf12f2').parent().children().val(0);
	    	
	    	// patch.fltMtx_F2ToF1 = 0;
	    	// $('#fltMtxf22f1').parent().children().val(0);
	    	
	    	patch.fltMtx_F1ToVE = 0;
	    	$('#fltMtxf12ve').parent().children().val(0);
	    	
	    	patch.fltMtx_F2ToVE = 0;
	    	$('#fltMtxf22ve').parent().children().val(0);
	    	
	    	$('#flt2').parent().removeClass('on');
 			$('#flt2').parent().next().slideUp();
 			$('#flt1').parent().removeClass('on');
 			$('#flt1').parent().next().slideUp();
    	}
    	
    });
    
	// LOAD REVERB IMPULSE 
	function setReverbImpulseResponse(url) {
		
		reverbInput1.disconnect();
		reverbInput1.connect(reverbOutput);
		document.getElementById('reverbSpinner').style.display="block";
		
	    // Load L impulse response asynchronously
	    var requestL = new XMLHttpRequest();
	    var urlL = url + '-l.wav';
	    
	    requestL.open("GET", urlL, true);
	    requestL.responseType = "arraybuffer";
	    requestL.onload = function() { 
	        context.decodeAudioData(
	            requestL.response,
	            function(buffer) {
	                convolverL.buffer = buffer;
	            },
	
	            function(buffer) {
	                console.log("Error decoding impulse response.");
	            }
	        );
	    }
	
	    requestL.send();

	    // Load R impulse response asynchronously
	    var requestR = new XMLHttpRequest();
	    var urlR = url + '-r.wav';
	    
	    requestR.open("GET", urlR, true);
	    requestR.responseType = "arraybuffer";
	    requestR.onload = function() { 
	        context.decodeAudioData(
	            requestR.response,
	            function(buffer) {
	                convolverR.buffer = buffer;
	            },
	
	            function(buffer) {
	                console.log("Error decoding impulse response.");
	            }
	        );
	        
        	reverbInput1.disconnect();
			reverbInput1.connect(reverbInput2);
        	document.getElementById('reverbSpinner').style.display="none";
        	
	    }
	
	    requestR.send();
	}
	
	// LOAD OSCILLATOR IMPULSE
	function loadOscImpulseResponse(url, number) {
		
		var osc = 'osc' + (number);
		document.getElementById(osc + '_convolverSpinner').style.display="block";
		
		// Load L impulse response asynchronously
	    var requestL = new XMLHttpRequest();
	    var urlL = 'ir/conv/' + url + '-l.wav';
	    
	    requestL.open("GET", urlL, true);
	    requestL.responseType = "arraybuffer";
	    requestL.onload = function() { 
	        context.decodeAudioData(
	            requestL.response,
	            function(buffer) {
	            	oscIR[osc+'_L'] = buffer
	            },
	
	            function(buffer) {
	                console.log("Error decoding impulse response.");
	            }
	        );
	    }
	
	    requestL.send();

	    // Load R impulse response asynchronously
	    var requestR = new XMLHttpRequest();
	    var urlR = 'ir/conv/' + url + '-r.wav';
	    
	    requestR.open("GET", urlR, true);
	    requestR.responseType = "arraybuffer";
	    requestR.onload = function() { 
	        context.decodeAudioData(
	            requestR.response,
	            function(buffer) {
	            	oscIR[osc+'_R'] = buffer;
	            },
	
	            function(buffer) {
	                console.log("Error decoding impulse response.");
	            }
	        );
	        
        	document.getElementById(osc + '_convolverSpinner').style.display="none";
	    }
	
	    requestR.send();
	    
	}

    
    // ---------- change trig values (microtonal pads) -----------
    
    $('#settingsDrop select').change(function() {
    	$(this).blur();
		rebuildMpPads();
	});
	
	$('#settingsDrop .parameter').change(function() {
		$(this).blur();
		rebuildMpPads();
	});
	
	$('#pitchManual').on( 'change', 'input', function(e) {
		pitchManualNum = $(this).parent().index();
		pitchManualNew = $(this).val();
		patch.trig_p[pitchManualNum] = pitchManualNew;
		rebuildMpPads();
	});
	
	$('#keyboardLayout').change(function() {
		if($('#keyboardLayout').val() == "QWERTY"){
			keyboardInput = keyboardInputQ;
			keyboardInputNum = keyboardInputNumQ;
		} else if($('#keyboardLayout').val() == "AZERTY") {
			keyboardInput = keyboardInputA;
			keyboardInputNum = keyboardInputNumA;
		} else if($('#keyboardLayout').val() == "QWERTZ") {
			keyboardInput = keyboardInputQT;
			keyboardInputNum = keyboardInputNumQT;
		}
		$(this).blur();
		rebuildMpPads();
	});

	
	function rebuildMpPads() {
		
		if($('#trig-mp-pitchCalc').val() == "m"){
			$('#pitchLinExp').slideUp("fast");
			$('#pitchET').slideUp("fast");
			$('#pitchQT').slideUp("fast");
			$('#pitchJI').slideUp("fast");
			$('#pitchManual').slideDown("fast");
		} else if($('#trig-mp-pitchCalc').val() == "lin" || $('#trig-mp-pitchCalc').val() == "exp"){
			$('#pitchLinExp').slideDown("fast");
			$('#pitchManual').slideUp("fast");
			$('#pitchET').slideUp("fast");
			$('#pitchQT').slideUp("fast");
			$('#pitchJI').slideUp("fast");
		} else if($('#trig-mp-pitchCalc').val() == "et"){
			$('#pitchLinExp').slideUp("fast");
			$('#pitchManual').slideUp("fast");
			$('#pitchQT').slideUp("fast");
			$('#pitchET').slideDown("fast");
			$('#pitchJI').slideUp("fast");
		} else if($('#trig-mp-pitchCalc').val() == "qt"){
			$('#pitchLinExp').slideUp("fast");
			$('#pitchManual').slideUp("fast");
			$('#pitchET').slideUp("fast");
			$('#pitchQT').slideDown("fast");
			$('#pitchJI').slideUp("fast");
		} else if($('#trig-mp-pitchCalc').val() == "ji"){
			$('#pitchLinExp').slideUp("fast");
			$('#pitchManual').slideUp("fast");
			$('#pitchET').slideUp("fast");
			$('#pitchQT').slideUp("fast");
			$('#pitchJI').slideDown("fast");
		}
		
		
		// put variables into PATCH
		
		patch["trig_pads"] = parseInt($('#trig-mp-numPads').val(), 10);
		patch["trig_pitchCalc"] = $('#trig-mp-pitchCalc').val();
		patch["trig_lp"] = parseInt($('#trig-mp-lp').val(), 10);
		patch["trig_lpqt"] = parseInt($('#trig-qt-lp').val(), 10);
		patch["trig_rp"] = parseInt($('#trig-mp-rp').val(), 10);
		patch["trig_pitchCalc"] = $('#trig-mp-pitchCalc').val();
		patch["trig_etStart"] = Number($('#trig-et-start').val());
		patch["trig_etKey"] = Number($('#trig-et-key').val());
		patch["trig_eqStart"] = Number($('#trig-qt-lp').val());
		patch["trig_jiF"] = Number($('#trig-ji-f').val());
		patch["trig_jiKey"] = $('#trig-ji-key').val();
						
		if (patch.trig_pitchCalc == "et"){
			if (patch.trig_etKey == "1"){
				keyLength = Cmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Cmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			}  else if (patch.trig_etKey == "2"){
				keyLength = Csharpmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Csharpmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "3"){
				keyLength = Dmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Dmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "4"){
				keyLength = Eflatmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Eflatmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "5"){
				keyLength = Emaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Emaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "6"){
				keyLength = Fmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Fmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "7"){
				keyLength = Fsharpmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Fsharpmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "8"){
				keyLength = Gmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Gmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "9"){
				keyLength = Aflatmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Aflatmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "10"){
				keyLength = Amaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Amaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "11"){
				keyLength = Aflatmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Aflatmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} else if (patch.trig_etKey == "12"){
				keyLength = Bmaj.length;
				for ( i = 0; i <= keyLength; i += 1 ) {
					if (equalTempered440[Bmaj[i]] >= equalTempered440[patch.trig_etStart]){
						patch["trig_etStartInKey"] = i; break
					}
				}
			} 
			
			
		}
		
		// re-calculate pitches and place in patch
		
		lowPitch = patch["trig_lp"];
		lowPitchQT = patch["trig_lpqt"];
		highPitch = patch["trig_rp"];
		totalBars = patch["trig_pads"];
		pitchDif = highPitch - lowPitch;
		
		if (patch.trig_pitchCalc == "lin"){
			if (totalBars > 1) {pitchCalc = pitchDif / (totalBars-1)} else {pitchCalc = 0}
			for ( i = 0; i <= totalBars-1; i += 1 ) {
				patch.trig_p[i] = Math.round(((i * pitchCalc) + lowPitch)*100)/100;
				
			}
			
		} else if (patch.trig_pitchCalc == "exp"){
			root = totalBars - 1;
			n = highPitch / lowPitch;
			pitchChange = Math.pow(n, 1/root);
			lastPitch = lowPitch;
			patch.trig_p[0] = lowPitch;
			for ( i = 1; i <= totalBars-1; i += 1 ) {
				barPitch = lastPitch * pitchChange;
				barPitch = Math.round(barPitch);
				patch.trig_p[i] = barPitch;
				lastPitch = barPitch;
				}
		} else if (patch.trig_pitchCalc == "qt"){
			root = 24;
			n = 2;
			pitchChange = Math.pow(n, 1/root);
			lastPitch = lowPitchQT;
			patch.trig_p[0] = lowPitchQT;
			for ( i = 1; i <= totalBars-1; i += 1 ) {
				barPitch = lastPitch * pitchChange;
				barPitch = Math.round(barPitch);
				patch.trig_p[i] = barPitch;
				lastPitch = barPitch;
				}
		} else if (patch.trig_pitchCalc == "et"){
			for ( i = 0; i <= 48; i += 1 ) {
				pitchNumber = patch.trig_etStart + i;
				if (pitchNumber > 107){pitchNumber = 107};
				
				pitchNumberInKey = patch.trig_etStartInKey + i;
				if (pitchNumberInKey > 62) {pitchNumberInKey = 62};
				if (patch.trig_etKey == "1"){
					pitchNumber = Cmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "2"){
					pitchNumber = Csharpmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "3"){
					pitchNumber = Dmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "4"){
					pitchNumber = Eflatmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "5"){
					pitchNumber = Emaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "6"){
					pitchNumber = Fmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "7"){
					pitchNumber = Fsharpmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "8"){
					pitchNumber = Gmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "9"){
					pitchNumber = Aflatmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "10"){
					pitchNumber = Amaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "11"){
					pitchNumber = Bflatmaj[pitchNumberInKey];
				} else if (patch.trig_etKey == "12"){
					pitchNumber = Bmaj[pitchNumberInKey];
				}
				
				patch.trig_p[i] = equalTempered440[pitchNumber];
				trig_n[i] = noteNames[pitchNumber];
				
				}
			} else if (patch.trig_pitchCalc == "ji"){
				var jiFundamental = patch.trig_jiF;
				if (patch.trig_jiKey === '12'){
					var jiRatios = [1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8, 2, 1+(16/15), 1+(9/8), 1+(6/5)]
				} else if (patch.trig_jiKey === '12maj'){
					var jiRatios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2, 1+(9/8), 1+(5/4), 1+(4/3), 1+(3/2), 1+(5/3), 1+(15/8), 3, 2+(9/8)]
				} else if (patch.trig_jiKey === '12min'){
					var jiRatios = [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5, 2, 1+(9/8), 1+(6/5), 1+(4/3), 1+(3/2), 1+(8/5), 1+(9/5), 3, 2+(9/8)]
				}
				for ( i = 0; i <= 48; i += 1 ) {
					patch.trig_p[i] = +((jiFundamental * jiRatios[i]).toFixed(2));
				}
			}
		
		// Change pads to reflect new pitches
		
		buttonHTML = "";
		pitchManual = "";
		var keyInp = "";
		for ( i = 0; i <= totalBars-1; i += 1 ) {
			if (keyboardInput[i]){keyInp = keyboardInput[i]}else{keyInp = ""};
			buttonHTML = buttonHTML + '<div class="tchKey"><div>'+keyInp+'</div><div class="bottom">';
			if (patch.trig_pitchCalc == "et"){buttonHTML = buttonHTML + trig_n[i] + '<br />'};
			buttonHTML = buttonHTML + Math.round(patch.trig_p[i]) + '&nbsp;Hz</div></div>';
			pitchManual = pitchManual + '<td><div>' + (i+1) + '&nbsp;(Hz)</div><input type="number" value="'+patch.trig_p[i]+'"/></td>';
		}
		
		// buttonHTML = buttonHTML + '<div style="display:inline; width: .5em"><span style="font-size:.25em">&nbsp;<span><div>';
		
		$('#buttonContainer').html(buttonHTML);
		$('#pitchManualContainer').html(pitchManual);				
	}
	
    
    
    // ----------  INTITIAL PATCH SETTINGS (WHICH ARE REPLACED BY LOADED PATCH 1â€¦ HERE FOR CLARIFICATION) ----------
    
    var patch = {
	    patchName:"Default",
	    bpm:120,
	    bpm_switch:"on",
	    
	    osc1_switch:"on",
	    osc1_wave:"square",
	    osc1_noise:"off",
	    osc1_noiseFilt:"bandpass",
	    osc1_noiseQ:.5,
	    osc1_octave:1,
	    osc1_pitchFine:0,
	    
	    osc1_pmlSwitch:"off", // #osc1_pmlSwitch
	    osc1_pmlBPM:"off",  // #osc1_pmlBPM
	    osc1_pmlFreq:7,
	    osc1_pmlAmount:15,
	    osc1_pmlOptions:"basic", // #osc1_pmlOptions
	    osc1_pmlShape:"sine", // #osc1_pmlShape
	    osc1_pmlSlide:50, // #osc1_pmlSlide
	    osc1_pmlEnvSwitch:"off", // #osc1pmlEnvSwitch
	    osc1_pmlDelaySwitch: 'on', // #osc1pmlDelaySwitch
	    osc1_pmlAttackSwitch: 'on', // #osc1pmlAttackSwitch
		osc1_pmlSustainSwitch: 'on', // #osc1pmlSustainSwitch
		osc1_pmlReleaseSwitch: 'off', // #osc1pmlReleaseSwitch
	    osc1_pmlDelay:.5,
	    osc1_pmlDelayBPM:"off", // #osc1pmlDelayBPM
	    osc1_pmlAttack:.5, //#osc1pmlAttack
	    osc1_pmlAttackBPM:"off", // #osc1pmlAttackBPM
	    osc1_pmlRelease:0, //#osc1pmlRelease
	    osc1_pmlReleaseBPM:"off", // #osc1pmlReleaseBPM
	    
	    osc1_pmeSwitch:"off",
	    osc1_pmeDelaySwitch:"off", // #osc1pmeDelaySwitch
	    osc1_pmeAttackSwitch:"off", // #osc1pmeAttackSwitch
	    osc1_pmeReleaseSwitch:"off", // #osc1pmeReleaseSwitch
	    osc1_pmeInitial:-25,
	    osc1_pmeDelay:0,
	    osc1_pmeAttack:1,
	    osc1_pmeSustainSwitch:"on",
	    osc1_pmeRelease:1,
	    osc1_pmeTerminal:-25,
	    osc1_pmeDelayBPM: "off", // #osc1pmeDelayBPM
		osc1_pmeAttackBPM: "off", // #osc1pmeAttackBPM
		osc1_pmeReleaseBPM: "off", // #osc1pmeReleaseBPM
	    
	    osc1_Amp:50,
	    osc1_ameSwitch:"off",
	    osc1_ameAttack:1,
	    osc1_ameSustainSwitch:"on",
	    osc1_ameDecay:1,
	    
	    osc1_amlSwitch:"off", // #osc1apmlSwitch
	    osc1_amlBPM:"off",  // #osc1amlBPM
	    osc1_amlFreq:7,
	    osc1_amlAmount:15,
	    osc1_amlOptions:"basic", // #osc1amlOptions
	    osc1_amlShape:"sine", // #osc1amlShape
	    osc1_amlSlide:50, // #osc1amlSlide
	    osc1_amlEnvSwitch:"off", // #osc1amlEnvSwitch
	    osc1_amlDelaySwitch: 'on', // #osc1amlDelaySwitch
	    osc1_amlAttackSwitch: 'on', // #osc1amlAttackSwitch
		osc1_amlSustainSwitch: 'on', // #osc1amlSustainSwitch
		osc1_amlReleaseSwitch: 'off', // #osc1amlReleaseSwitch
	    osc1_amlDelay:.5,
	    osc1_amlDelayBPM:"off", // #osc1amlDelayBPM
	    osc1_amlAttack:.5, //#osc1amlAttack
	    osc1_amlAttackBPM:"off", // #osc1amlAttackBPM
	    osc1_amlRelease:0, //#osc1amlRelease
	    osc1_amlReleaseBPM:"off", // #osc1amlReleaseBPM
	    
	    // OSC 2 is OLD
	    osc2_switch:"on",
	    osc2_wave:"sine",
	    osc2_noise:"off",
	    osc2_noiseFilt:"bandpass",
	    osc2_noiseQ:.5,
	    osc2_octave:.25,
	    osc2_pitchFine:0,
	    osc2_pmeSwitch:"off",
	    osc2_pmeInitial:-25,
	    osc2_pmeDelay:0,
	    osc2_pmeAttack:1,
	    osc2_pmeSustainSwitch:"on",
	    osc2_pmeDecay:1,
	    osc2_pmeTerminal:-25,
	    osc2_pmlSwitch:"off",
	    osc2_pmlShape:"sine",
	    osc2_pmlFreq:7,
	    osc2_pmlFreqAttack:1,
	    osc2_pmlAmount:15,
	    osc2_pmlDelay:.5,
	    osc2_Amp:75,
	    osc2_ameSwitch:"off",
	    osc2_ameAttack:1,
	    osc2_ameSustainSwitch:"on",
	    osc2_ameDecay:1,
	    osc2_amlSwitch:"off",
	    osc2_amlShape:"sine",
	    osc2_amlFreq:7,
	    osc2_amlAmount:15,
	    osc2_amlDelay:.5,
	    
	    flts_switch:"on",
	    
	    fltMtx_switch:"on",
	    fltMtx_preset: "serial",
	    fltMtx_oscsToF1: 100,
	    fltMtx_oscsToF2: 0,
	    fltMtx_oscsToVE: 0,
	    fltMtx_F1ToF2: 100,
	    fltMtx_F1ToVE: 0,
	    fltMtx_F2ToVE: 100,
	    
	    flt1_switch:"on",
	    flt1_type:"lowpass",
	    flt1_cutoff:500,
	    flt1_q:1,
	    flt1_lSwitch:"off",
	    flt1_lShape:"sine",
	    flt1_lDelay:.5,
	    flt1_lBPM:"off",  //  #flt1lBP
	    flt1_lFreq:7,
	    flt1_lAmount:15,
	    flt1_eSwitch:"on",
	    flt1_eInitial:20000,
	    flt1_eAttack:.4,
	    flt1_eSustainSwitch:"on",
	    flt1_eRelease:.1,
	    flt1_eTerminal:50,
	    
	    // flt2 old:
	    flt2_switch:"off",
	    flt2_type:"lowpass",
	    flt2_cutoff:500,
	    flt2_q:1,
	    flt2_pmlSwitch:"off",
	    flt2_pmlShape:"sine",
	    flt2_pmlDelay:.5,
	    flt2_pmlBPM:"off",  //  #flt2lBPM
	    flt2_pmlFreq:7,
	    flt2_pmlAmount:15,
	    flt2_ceSwitch:"on",
	    flt2_ceIC:20000,
	    flt2_ceA:.4,
	    flt2_ceSustainSwitch:"on",
	    flt2_ceR:.1,
	    flt2_ceEC:50,
	    
	    // ENVELOPE
	    
	    ae_switch:"on", // #ampEnv = amplitude envelope switch
	    ae_options:"extended", // #aeOptions
	    ae_attackTimeBPM:"off", // #ampEnvAttackTimeBPM
	    ae_releaseTimeBPM:"off", //#ampEnvReleaseTimeBPM
	    ae_holdTimeBPM:"off", //#ampEnvHoldBPM
	    
	    
	    // OLD
	    ae_switch:"on", // #ampEnv = amplitude envelope switch
	    ae_attackSwitch:"on", // #ampEnvAttackSwitch = attack switch
	    ae_attackType:"simple", // #ampEnvAttackType = attack simple/complex switch
	    ae_attackTime:0, // #ampEnvAttackTime = attack simple time
	    ae_attackPart1Switch:"on", // #ampEnvAttackPart1Switch = attack part 1 switch
	    ae_attackPart1Shape:"linear", // #ampEnvAttackPart1Shape = attack part 1 shape lin/exp
	    ae_attackPart1TimeBPM:"off", // #ampEnvAttackPart1TimeBPM = attack part 1 time from BPM
	    ae_attackPart1Time:0, // #ampEnvAttackPart1Time = attack part 1 time
	    ae_attackPart1Level:100, // #ampEnvAttackPart1Level = attack part 1 target level
	    ae_attackPart2Switch:"on", // #ampEnvAttackPart2Switch = attack part 2 switch
	    ae_attackPart2Shape:"linear", // #ampEnvAttackPart2Shape = attack part 2 shape
	    ae_attackPart2TimeBPM:"off", // #ampEnvAttackPart2TimeBPM = attack part 2 time from BPM
	    ae_attackPart2Time:0, // #ampEnvAttackPart2Time = attack part 2 time
	    ae_attackPart2Level:100, // #ampEnvAttackPart2Level = attack part 1 target level
	    ae_decaySwitch:"on", // #ampEnvDecaySwitch = decay switch
	    ae_decayType:"simple", // #ampEnvDecayType = decay simple/complex switch
	    ae_decayShape:"linear", // #ampEnvDecayShape = decay shape lin/exp
	    ae_decayTimeBPM:"off", // #ampEnvDecayTimeBPM = decay time from BPM
	    ae_decayTime:0, // #ampEnvDecay = decay time
	    ae_decayLevel:50, // #ampEnvDecayLevel = decay target level
	    ae_sustainSwitch:"on", // #ampEnvSustainSwitch = sustain switch
	    ae_sustainMaxSwitch:"off", // #ampEnvSustainSwitchMax = maximum sustain time switch
	    ae_sustainTimeBPM:"off", // #ampEnvSustainMaxTimeBPM = maximum sustain time from BPM
	    ae_sustainMaxTime:2, // #ampEnvSustainTimeMax = maximum sustain time
	    ae_holdSwitch:"off", // #ampEnvHoldSwitch = hold switch
	    ae_holdTimeBPM:"off", // #ampEnvHoldBPM = hold time from BPM
	    ae_holdTime:2, // #ampEnvHold = hold time
	    ae_releaseSwitch:"on", // #ampEnvReleaseSwitch = release switch
	    ae_releaseType:"simple", // #ampEnvReleaseType = release simple/complex switch
	    ae_releaseTime:1, // #ampEnvReleaseTime = release simple time
	    ae_releasePart1Switch:"on", // #ampEnvReleasePart1Switch = release part 1 switch
	    ae_releasePart1Shape:"linear", // #ampEnvReleasePart1Shape = release part 1 shape lin/exp
	    ae_releasePart1TimeBPM:"off", // #ampEnvReleasePart1TimeBPM = release part 1 time from BPM
	    ae_releasePart1Time:1, // #ampEnvReleasePart1Time = release part 1 time
	    ae_releasePart1Level:75, // #ampEnvReleasePart1Level = release part 1 target level
	    ae_releasePart2Switch:"on", // #ampEnvReleasePart2Switch = release part 2 switch
	    ae_releasePart2Shape:"linear", // #ampEnvReleasePart2Shape = release part 2 shape lin/exp
	    ae_releasePart2TimeBPM:"off", // #ampEnvReleasePart2TimeBPM = release part 2 time from BPM
	    ae_releasePart2Time:1, // #ampEnvReleasePart2Time = release part 2 time
	    ae_releasePart2Level:50, // #ampEnvReleasePart2Level = release part 2 target level
	    ae_releasePart3Switch:"on", // #ampEnvReleasePart3Switch = release part 3 switch
	    ae_releasePart3Shape:"linear", // #ampEnvReleasePart3Shape = release part 3 shape lin/exp
	    ae_releasePart3TimeBPM:"off", // #ampEnvReleasePart3TimeBPM = release part 3 time from BPM
	    ae_releasePart3Time:1, // #ampEnvReleasePart3Time = release part 3 time
	    
	    effects_switch:"on",
	    
	    distortion_switch:"off",
	    distortion_gain: 0,
	    distortion_drive: 0,
	    distortion_curve: .5,
	    distortion_type: 0,
	    distortion_EQswitch:"on", //#delayEQSwitch
	    distortion_hc: 2000,
	    distortion_hcQ: 1,  //#distortionHCQ
	    distortion_lc: 200,
	    distortion_lcQ: 1,  //#distortionLCQ
	    distortion_level: 50,
	    distortion_mix: 50,
	    
	    delays_switch:"on", // #delays
	    
	    delay_switch:"on",
	    delay_timeBPM:"off", //#delayTimeBPM
	    delay_time:.3,
	    delay_fb:35,
	    delay_EQswitch:"on", //#delayEQSwitch
	    delay_hc:10000,
	    delay_lc:1000,
	    delay_mix:13,
	    
	    dualDelay_switch:"off", // #dualDelay
	    dualDelay_InputA:100, // #ddInputA
	    dualDelay_TimeABPM:"off", // #ddTimeABPM
	    dualDelay_TimeA:.2, // #ddTimeA
	    dualDelay_fbA:0, // #ddFeedbackA
	    dualDelay_AtoB:50, // #ddAtoB
	    dualDelay_PanA:-100, // #ddPanA
	    dualDelay_AtoOut:75, // #ddAtoOut
	    dualDelay_InputB:0, // #ddInputB
	    dualDelay_TimeBBPM:"off", // #ddTimeBBPM
	    dualDelay_TimeB:.2, // #ddTimeB
	    dualDelay_fbB:0, // #ddFeedbackB
	    dualDelay_BtoA:50, // #ddBtoA
	    dualDelay_PanB:100, // #ddPanB
	    dualDelay_BtoOut:75, // #ddBtoOut
	    dualDelay_EQswitch:"off", //#ddEQSwitch
	    dualDelay_hcA:10000, //#ddHCA
	    dualDelay_lcA:100, //#ddLCA
	    dualDelay_hcB:10000, //#ddHCB
	    dualDelay_lcB:100, //#ddLCB
	    dualDelay_Mix:50, // #ddMix
	    
	    modulation_switch:"off", // #modulation
	    
	    chorus_switch:"off", // #chorusSwitch
	    chorus_delay:3.5, // #chorusDelay
	    chorus_rate:1.5, // #chorusRate
	    chorus_depth:50, // #chorusDepth
	    chorus_invertSwitch:"on",// #chorusInvertSwitch
	    chorus_mix:50, // #chorusMix
	    chorus_lc:10,// #chorusLC
	    
		tremolo_switch:"off", // #tremoloSwitch
		tremolo_rateBPM:"off", // #tremoloRateBPM
		tremolo_rate:1.5, // #tremoloRate
		tremolo_depth:50, // #tremoloDepth
		tremolo_invertSwitch:"on", // #tremoloInvertSwitch
		tremolo_stereoWidth:100, // #tremoloStereoWidth
		tremolo_mix:100, // #tremoloMix
		tremolo_shape:0, // #tremoloShape
	    	    	    
	    reverb_switch:"off",
	    reverb_EQswitch:"on",
	    reverb_type:"l",
	    reverb_hc:10000,
	    reverb_lc:50,
	    reverb_mix:25,
	    
	    eq_switch:"off", // #eq
	    eq_HSswitch:"off", // #eqHSSwitch
	    eq_HSamount:0, // #eqHS
	    eq_P1switch:"off", // #eqP1Switch
	    eq_P1amount:0, // #eqP1a
	    eq_P1freq:0, // #eqP1f
	    eq_P2switch:"off", // #eqP2Switch
	    eq_P2amount:0, // #eqP2a
	    eq_P2freq:0, // #eqP2f
	    eq_LSswitch:"off", // #eqLSSwitch
	    eq_LSamount:0, // #eqLS
	    
	    compressor_switch:"off",
	    compressor_threshold:-24,
	    compressor_ratio:12,
	    compressor_makeup:3,
	    compressor_dry:0, // #compressorDry
	    
	    volume_switch:"on",
	    attenuate_switch:"on", // #attenuate
	    volume_input:.5,
	    
	    limiter_switch:"on", // #limiter
	    limiter_threshold:-24, // #limiterThreshold
	    
	    meters_switch:"on",
	    
	    trig_system:"mtp",
	    trig_pads:6,
	    trig_pitchCalc:"exp",
	    trig_lp:220,
	    trig_lpqt:220,
	    trig_rp:440,
	    trig_etStart:0,
	    trig_etKey:0,
	    trig_etStartInKey:0
	    
	};

	
	patch["trig_p"] = [220, 262, 312, 371, 441, 526, 626, 745, 887, 1056, 1257, 1496, 1781, 2120, 2523, 3000];
	
	var trig_n = [];
	
	var keyboardInputQ = ["z","x","c","v","b","n","m","<",">","?","a","s","d","f","g","h","j","k","l",";","q","w","e","r","t","y","u","i","o","p","1","2","3","4","5","6","7","8","9","0"];
	var keyboardInputNumQ = [90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
	
	var keyboardInputA = ["w","x","c","v","b","n","q","s","d","f","g","h","j","k","l","m","a","z","e","r","t","y","u","i","o","p","1","2","3","4","5","6","7","8","9","0"];
	var keyboardInputNumA = [87, 88, 67, 86, 66, 78, 81, 83, 68, 70, 71, 72, 74, 75, 76, 77, 65, 90, 69, 82, 84, 89, 85, 73, 79, 80, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
	
var keyboardInputQT = ["<", "y", "x", "c", "v", "b", "n", "m", ",", ".", "-", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Ã¶", "Ã¤", "q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "Ã¼", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var keyboardInputNumQT = [226, 89, 88, 67, 86, 66, 78, 77, 188, 190, 189, 65, 83, 68, 70, 71, 72, 74, 75, 76, 192, 222, 81, 87, 69, 82, 84, 90, 85, 73, 79, 80, 186, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
	
	var keyboardInput = keyboardInputQ;
	var keyboardInputNum = keyboardInputNumQ;
	
	
	// var keyboardInputDown = ["off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off", "off"];
	var keyboardInputDown = [];
	for (var i = 0; i < 50; i++) {
	    keyboardInputDown.push("off");
	}
	
	var noteNames = ["C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B", "C", "C&#35;", "D", "D&#35;", "E", "F", "F&#35;", "G", "G&#35;", "A", "A&#35;", "B"]
	
	var equalTempered440 = [16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87, 32.70, 34.65, 36.71, 38.89, 41.20, 43.65, 46.25, 49, 51.91, 55, 58.27, 61.74, 65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98, 103.83, 110, 116.54, 123.47, 130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94, 261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3, 440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77, 1046.50, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760, 1864.66, 1975.53, 2093, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520, 3729.31, 3951.07, 4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040, 7458.62, 7902.13];
		
	var Cmaj = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48,50,52,53,55,57,59,60,62,64,65,67,69,71,72,74,76,77,79,81,83,84,86,88,89,91,93,95,96,98,100,101,103,105,107];
	
	var Csharpmaj = [0,1,3,5,6,8,10,12,13,15,17,18,20,22,24,25,27,29,30,32,34,36,37,39,41,42,44,46,48,49,51,53,54,56,58,60,61,63,65,66,68,70,72,73,75,77,78,80,82,84,85,87,89,90,92,94,96,97,99,101,102,104,106];
	
	var Dmaj = [1,2,4,6,7,9,11,13,14,16,18,19,21,23,25,26,28,30,31,33,35,37,38,40,42,43,45,47,49,50,52,54,55,57,59,61,62,64,66,67,69,71,73,74,76,78,79,81,83,85,86,88,90,91,93,95,97,98,100,102,103,105,107];
	
	var Eflatmaj = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24,26,27,29,31,32,34,36,38,39,41,43,44,46,48,50,51,53,55,56,58,60,62,63,65,67,68,70,72,74,75,77,79,80,82,84,86,87,89,91,92,94,96,98,99,101,103,104,106];

	var Emaj = [1,3,4,6,8,9,11,13,15,16,18,20,21,23,25,27,28,30,32,33,35,37,39,40,42,44,45,47,49,51,52,54,56,57,59,61,63,64,66,68,69,71,73,75,76,78,80,81,83,85,87,88,90,92,93,95,97,99,100,102,104,105,107];
	
	var Fmaj = [0,2,4,5,7,9,10,12,14,16,17,19,21,22,24,26,28,29,31,33,34,36,38,40,41,43,45,46,48,50,52,53,55,57,58,60,62,64,65,67,69,70,72,74,76,77,79,81,82,84,86,88,89,91,93,94,96,98,100,101,103,105,106];
	
	var Fsharpmaj = [1,3,5,6,8,10,11,13,15,17,18,20,22,23,25,27,29,30,32,34,35,37,39,41,42,44,46,47,49,51,53,54,56,58,59,61,63,65,66,68,70,71,73,75,77,78,80,82,83,85,87,89,90,92,94,95,97,99,101,102,104,106,107];
	
	var Gmaj = [0,2,4,6,7,9,11,12,14,16,18,19,21,23,24,26,28,30,31,33,34,36,38,40,42,43,45,46,48,50,52,54,55,57,59,60,62,64,66,67,69,71,72,74,76,78,79,81,83,84,86,88,90,91,93,94,96,98,100,102,103,105,106];
	
	var Aflatmaj = [0,1,3,5,7,8,10,12,13,15,17,19,20,22,24,25,27,29,31,32,34,36,37,39,41,43,44,46,48,49,51,53,55,56,58,60,61,63,65,67,68,70,72,73,75,77,78,80,82,84,85,87,89,90,92,94,96,97,99,101,102,104,106];
	
	var Amaj = [1,2,4,6,8,9,11,13,14,16,18,20,21,23,25,26,28,30,32,33,35,37,38,40,42,44,45,47,49,50,52,54,56,57,59,61,62,64,66,68,69,71,73,74,76,78,80,81,83,85,86,88,90,92,93,95,97,98,100,102,104,105,107];
	
	var Bflatmaj = [0,2,3,5,7,9,10,12,14,15,17,19,21,22,24,26,27,29,31,33,34,36,38,39,41,43,45,46,48,50,51,53,55,57,58,60,62,63,65,67,69,70,72,74,75,77,79,81,82,84,86,87,89,91,93,94,96,98,99,101,103,105,106];
	
	var Bmaj = [1,3,4,6,8,10,11,13,15,16,18,20,22,23,25,27,28,30,32,34,35,37,39,40,42,44,46,47,49,51,52,54,56,58,59,61,63,64,66,68,70,71,73,75,76,78,80,82,83,85,87,88,90,92,94,95,97,99,100,102,104,106,107]

	
	
// ----------- INITIALIZE SYNTH --------------		
	
	function init() {
	  try {
	    window.AudioContext = window.AudioContext||window.webkitAudioContext;
	    context = new AudioContext();
	    tuna = new Tuna(context);
	    panicVoices  = new Array();
	    
	    oscIR = [];
	    
	    rebuildMpPads();
	    
	    // LFOs
	    
	    osc1_pulselfo = context.createOscillator();
	    osc1_pulselfoGain = context.createGain(); // for Reverse Saw
	    osc1_pulselfo.connect(osc1_pulselfoGain);
	    osc1_pulselfo.start(0);
	    osc1_pmlfo = context.createOscillator();
	    osc1_pmlfoGain = context.createGain();
	    osc1_pmlfo.connect(osc1_pmlfoGain);
	    osc1_pmlfo.start(0);
	    osc1_amlfo = context.createOscillator();
	    osc1_amlfoGain = context.createGain();
	    osc1_amlfo.connect(osc1_amlfoGain);
	    osc1_amlfo.start(0);
	    osc1_panlfo = context.createOscillator();
	    osc1_panlfo.type = 'triangle';
	    osc1_panlfoGain = context.createGain();
	    osc1_panlfo.connect(osc1_panlfoGain);
	    osc1_panlfo.start(0);
	    loadOscImpulseResponse('drm1_bassdrum_a', 1);
	    
	    osc2_pulselfo = context.createOscillator();
	    osc2_pulselfoGain = context.createGain(); // for Reverse Saw
	    osc2_pulselfo.connect(osc2_pulselfoGain);
	    osc2_pulselfo.start(0);
	    osc2_pmlfo = context.createOscillator();
	    osc2_pmlfoGain = context.createGain();
	    osc2_pmlfo.connect(osc2_pmlfoGain);
	    osc2_pmlfo.start(0);
	    osc2_amlfo = context.createOscillator();
	    osc2_amlfoGain = context.createGain();
	    osc2_amlfo.connect(osc2_amlfoGain);
	    osc2_amlfo.start(0);
	    osc2_panlfo = context.createOscillator();
	    osc2_panlfo.type = 'triangle';
	    osc2_panlfoGain = context.createGain();
	    osc2_panlfo.connect(osc2_panlfoGain);
	    osc2_panlfo.start(0);
	    loadOscImpulseResponse('drm1_bassdrum_a', 2);
	    
	    osc3_pulselfo = context.createOscillator();
	    osc3_pulselfoGain = context.createGain(); // for Reverse Saw
	    osc3_pulselfo.connect(osc3_pulselfoGain);
	    osc3_pulselfo.start(0);
	    osc3_pmlfo = context.createOscillator();
	    osc3_pmlfoGain = context.createGain();
	    osc3_pmlfo.connect(osc3_pmlfoGain);
	    osc3_pmlfo.start(0);
	    osc3_amlfo = context.createOscillator();
	    osc3_amlfoGain = context.createGain();
	    osc3_amlfo.connect(osc3_amlfoGain);
	    osc3_amlfo.start(0);
	    osc3_panlfo = context.createOscillator();
	    osc3_panlfo.type = 'triangle';
	    osc3_panlfoGain = context.createGain();
	    osc3_panlfo.connect(osc3_panlfoGain);
	    osc3_panlfo.start(0);
	    loadOscImpulseResponse('drm1_bassdrum_a', 3);
	    
	    flt1_pmlfo = context.createOscillator();
	    flt1_pmlfoRev = context.createGain();
	    flt1_pmlfo.connect(flt1_pmlfoRev);
	    flt1_pmlfo.start(0);
	    flt2_pmlfo = context.createOscillator();
	    flt2_pmlfoRev = context.createGain();
	    flt2_pmlfo.connect(flt2_pmlfoRev);
	    flt2_pmlfo.start(0);
	    
	    // EFFECTS
	    
	    effectsInput1 = context.createGain();
	    effectsInput2 = context.createGain();
	    effectsOutput = context.createGain();
	    
	    compressorInput1 = context.createGain();
    	compressorInput2 = context.createGain();
    	compressorOutput = context.createGain();
    	compressor = context.createDynamicsCompressor();
    	compressor.threshold.value = patch.compressor_threshold;
    	compressor.ratio.value = patch.compressor_ratio;
    	compressorMakeup = context.createGain();
    	compressorMakeup.gain.value = patch.compressor_makeup;
    	compressorDry = context.createGain();
    	compressorDry.gain.value = patch.compressor_dry;
	    
	    distortionInput1 = context.createGain();
	    distortionInput2 = context.createGain();
	    distortionOutput = context.createGain();
	    distortion = new tuna.Overdrive({
                    outputGain: 0.5,         //0 to 1+
                    drive: 0.7,              //0 to 1
                    curveAmount: 1,          //0 to 1
                    algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
                    bypass: 0
                });
        distortionFiltInp1 = context.createGain();
        distortionFiltInp2 = context.createGain();
        distortionHC = context.createBiquadFilter();
    	distortionHC.frequency.value = patch.distortion_hc;
    	distortionHC.Q.value = patch.distortion_hcQ;
    	distortionLC = context.createBiquadFilter();
    	distortionLC.type = "highpass";
    	distortionLC.frequency.value = patch.distortion_lc;
    	distortionLC.Q.value = patch.distortion_lcQ;
        distortionLevel = context.createGain();
	    distortionLevel.gain.value = .5;
	    distortionMix = context.createGain();
	    distortionMix.gain.value = patch.distortion_mix*.01;
	    distortionDirect = context.createGain();
	    distortionDirect.gain.value = 1 - patch.distortion_mix*.01;
	    
	    delaysInput1 = context.createGain();
	    delaysInput2 = context.createGain();
	    delaysOutput = context.createGain();
	    	    
	    delayInput1 = context.createGain();
	    delayInput2 = context.createGain();
	    delayOutput = context.createGain();
	    delay = context.createDelay(5.0);
	    delay.delayTime.value = patch.delay_time;
	    delayFB = context.createGain();
	    delayFB.gain.value = patch.delay_fb*.01;
	    delayFiltInp1 = context.createGain();
        delayFiltInp2 = context.createGain();
        delayFiltOut = context.createGain();
	    delayHC = context.createBiquadFilter();
    	delayHC.frequency.value = patch.delay_hc;
    	delayLC = context.createBiquadFilter();
    	delayLC.type = "highpass";
    	delayLC.frequency.value = patch.delay_lc;
    	delayMix = context.createGain();
    	delayMix.gain.value = patch.delay_mix*.01;
    	delayDirect = context.createGain();
    	delayDirect.gain.value = .7;
    	
    	ddInput1 = context.createGain();
    	ddInput2 = context.createGain();
    	ddOutput = context.createGain();
    	ddInputA = context.createGain();
    	ddInputA.gain.value = patch.dualDelay_InputA*.01;
    	ddA = context.createDelay(5.0);
    	ddA.delayTime.value = patch.dualDelay_TimeA;
    	ddAFB = context.createGain();
	    ddAFB.gain.value = patch.dualDelay_fbA*.01;
	    ddAtoB = context.createGain();
	    ddAtoB.gain.value = patch.dualDelay_AtoB*.01;
	    ddAsplitter = context.createChannelSplitter(2);
	    ddApanLeft = context.createGain();
		ddApanRight = context.createGain();
		ddAmerger = context.createChannelMerger(2);
		ddApanLeft.gain.value = ( patch.dualDelay_PanA * -0.005 ) + 0.5;
		ddApanRight.gain.value = ( patch.dualDelay_PanA * 0.005 ) + 0.5;
	    ddAtoOut = context.createGain();
	    ddAtoOut.gain.value = patch.dualDelay_AtoOut*.01;
	    ddInputB = context.createGain();
    	ddInputB.gain.value = patch.dualDelay_InputB*.01;
    	ddB = context.createDelay(5.0);
    	ddB.delayTime.value = patch.dualDelay_TimeB;
    	ddBFB = context.createGain();
	    ddBFB.gain.value = patch.dualDelay_fbB*.01;
	    ddBtoA = context.createGain();
	    ddBtoA.gain.value = patch.dualDelay_BtoA*.01;
	    ddBsplitter = context.createChannelSplitter(2);
	    ddBpanLeft = context.createGain();
		ddBpanRight = context.createGain();
		ddBmerger = context.createChannelMerger(2);
		ddBpanLeft.gain.value = ( patch.dualDelay_PanB * -0.005 ) + 0.5;
		ddBpanRight.gain.value = ( patch.dualDelay_PanB * 0.005 ) + 0.5;
	    ddBtoOut = context.createGain();
	    ddBtoOut.gain.value = patch.dualDelay_BtoOut*.01;
	    ddMix = context.createGain();
    	ddMix.gain.value = patch.dualDelay_Mix*.01;
    	ddDirect = context.createGain();
    	ddDirect.gain.value = 1 - patch.dualDelay_Mix*.01;
    	ddHCA = context.createBiquadFilter();
    	ddHCA.frequency.value = patch.dualDelay_hcA;
    	ddLCA = context.createBiquadFilter();
    	ddLCA.type = "highpass";
    	ddLCA.frequency.value = patch.dualDelay_lcA;
    	ddHCB = context.createBiquadFilter();
    	ddHCB.frequency.value = patch.dualDelay_hcA;
    	ddLCB = context.createBiquadFilter();
    	ddLCB.type = "highpass";
    	ddLCB.frequency.value = patch.dualDelay_lcA;
    	ddFltInpA = context.createGain();
    	ddFltInpB = context.createGain();
    	
    	modulationInput1 = context.createGain();
	    modulationInput2 = context.createGain();
	    modulationOutput = context.createGain();
	    
	    chorusInput1 = context.createGain();  // patch.chorus_switch #chorusSwitch
	    chorusInput2 = context.createGain();
	    chorusOutput = context.createGain();
	    chorusInvert = context.createGain();
	    chorusInvert.gain.value = -1;
	    chorusDelayLeft = context.createDelay();
	    chorusDelayLeft.delayTime.value = patch.chorus_delay / 1000; // #chorusDelay
	    chorusDelayRight = context.createDelay();
	    chorusDelayRight.delayTime.value = patch.chorus_delay / 1000; // #chorusDelay
	    chorusLFO = context.createOscillator();
	    chorusLFO.frequency.value = patch.chorus_rate; // #chorusRate
		chorusLFO.start(0);
		chorusLFOGain = context.createGain();
		chorusLFOGain.gain.value = .001;
		chorusDepth = context.createGain();
		chorusDepth.gain.value = patch.chorus_depth *.01 + (patch.chorus_delay / 1000); // #chorusDepth
	    chorusMix = context.createGain();
	    chorusMix.gain.value = Math.cos((patch.chorus_mix *.01) * 0.5*Math.PI);  // #chorusMix
	    chorusDirect = context.createGain();
	    chorusDirect.gain.value = Math.cos((1.0 - (patch.chorus_mix *.01)) * 0.5*Math.PI);
	    chorusMerger = context.createChannelMerger(2);
	    chorusSplitter = context.createChannelSplitter(2);
	    chorusLC = context.createBiquadFilter(); // chorus_lc:100 #chorusLC
    	chorusLC.type = "highpass";
    	chorusLC.frequency.value = patch.chorus_lc;
    	
    	tremoloInput1 = context.createGain();  // patch.tremolo_switch #tremoloSwitch
	    tremoloInput2 = context.createGain();
	    tremoloOutput = context.createGain();
	    tremoloInvert = context.createGain();
	    tremoloInvert.gain.value = -1;
	    tremoloLFO = context.createOscillator();
	    tremoloLFO.frequency.value = patch.tremolo_rate; // #tremoloRate
	    tremoloLFO.type = 'triangle';
		tremoloLFO.start(0);
		tremoloLFOAmp = context.createGain();
		tremoloLFO2 = context.createOscillator();
	    tremoloLFO2.frequency.value = patch.tremolo_rate; // #tremoloRate
	    tremoloLFO2.type = 'square';
		tremoloLFO2.start(0);
		tremoloLFO2Amp = context.createGain();
		tremoloLFO2Amp.gain.value = 0;
		tremoloDepth = context.createGain();
		tremoloDepth.gain.value = patch.tremolo_depth * .01;
		tremoloAmpLeft = context.createGain(); 
		tremoloAmpRight = context.createGain();
		tremoloLeftLeft = context.createGain();
		tremoloLeftRight = context.createGain();
		tremoloRightLeft = context.createGain();
		tremoloRightRight = context.createGain();
		tremoloLeftRight.gain.value = 0;
		tremoloRightLeft.gain.value = 0;
		tremoloMix = context.createGain();
	    tremoloMix.gain.value = Math.cos((patch.tremolo_mix *.01) * 0.5*Math.PI);  // #tremoloMix
	    tremoloDirect = context.createGain();
	    tremoloDirect.gain.value = Math.cos((1.0 - (patch.tremolo_mix *.01)) * 0.5*Math.PI);
	    tremoloMerger = context.createChannelMerger(2);
	    tremoloSplitter = context.createChannelSplitter(2);
	    
	    reverbInput1 = context.createGain();
	    reverbInput2 = context.createGain();
	    reverbOutput = context.createGain();
	    reverbDelay = context.createDelay(1.0);
	    reverbSplitter = context.createChannelSplitter(2);
	    convolverL = context.createConvolver();
	    convolverR = context.createConvolver();
	    setReverbImpulseResponse('ir/s', "r");  // Run function that loads convolver buffer
	    reverbMerger = context.createChannelMerger(2);
	    reverbMix = context.createGain();
	    reverbMix.gain.value = .25;
	    reverbDirect = context.createGain();
	    reverbHC = context.createBiquadFilter();
    	reverbHC.Q.value = 3;
    	reverbHC.frequency.value = 3500;
    	reverbLC = context.createBiquadFilter();
    	reverbLC.type = "highpass";
    	reverbLC.Q.value = 3;
    	reverbLC.frequency.value = 50;
    	
    	eqInput1 = context.createGain();
	    eqInput2 = context.createGain();
	    eqOutput = context.createGain();
	    
	    eqHCInput1 = context.createGain();
	    eqHCInput2 = context.createGain();
	    eqHCOutput = context.createGain();
	    eqHC = context.createBiquadFilter();
	    eqHC.type = "lowpass";
	    eqHC.frequency.value = 20000;

	    eqHSInput1 = context.createGain();
	    eqHSInput2 = context.createGain();
	    eqHSOutput = context.createGain();
	    eqHS = context.createBiquadFilter();
	    eqHS.type = "highshelf";
	    eqHS.frequency.value = 12000;
	    eqHS.gain.value = patch.eq_HSamount;
	    
	    eqP1Input1 = context.createGain();
	    eqP1Input2 = context.createGain();
	    eqP1Output = context.createGain();
	    eqP1 = context.createBiquadFilter();
	    eqP1.type = "peaking";
	    eqP1.frequency.value = patch.eq_P1freq;
	    eqP1.gain.value = patch.eq_P1amount;
	    
	    eqP2Input1 = context.createGain();
	    eqP2Input2 = context.createGain();
	    eqP2Output = context.createGain();
	    eqP2 = context.createBiquadFilter();
	    eqP2.type = "peaking";
	    eqP2.frequency.value = patch.eq_P1freq;
	    eqP2.gain.value = patch.eq_P1amount;
	    
	    eqLSInput1 = context.createGain();
	    eqLSInput2 = context.createGain();
	    eqLSOutput = context.createGain();
	    eqLS = context.createBiquadFilter();
	    eqLS.type = "lowshelf";
	    eqHS.frequency.value = 80;
	    eqHS.gain.value = patch.eq_LSamount;
	    
	    eqLCInput1 = context.createGain();
	    eqLCInput2 = context.createGain();
	    eqLCOutput = context.createGain();
	    eqLC = context.createBiquadFilter();
	    eqLC.type = "highpass";
	    eqLC.frequency.value = 10000;
	        	    		    
	    volumeInput1 = context.createGain();
    	volumeInput2 = context.createGain();
    	volumeOutput = context.createGain();
	    
	    attenuateInput1 = context.createGain();
    	attenuateInput2 = context.createGain();
	    attenuateOutput = context.createGain();
	    volume = context.createGain();
	    volume.gain.value = patch.volume_input;
	    
	    limiterInput1 = context.createGain();
    	limiterInput2 = context.createGain();
	    limiterOutput = context.createGain();
	    limiter = context.createDynamicsCompressor();
	    limiter.threshold.value = patch.limiter_threshold;
    	limiter.ratio.value = 20;
	    
	    postVolume = context.createGain();
	    
	    effectsInput1.connect(effectsInput2);
	    effectsOutput.connect(volumeInput1);
	    
	    effectsInput2.connect(compressorInput1);
	    compressorInput1.connect(compressorInput2);
	    compressorInput2.connect(compressor);
	    compressor.connect(compressorMakeup);
	    compressorMakeup.connect(compressorOutput);
	    compressorInput2.connect(compressorDry);
	    compressorDry.connect(compressorOutput);
	    compressorOutput.connect(distortionInput1);
	    
	    distortionInput1.connect(distortionInput2);
		distortionInput2.connect(distortion.input);
		distortion.connect(distortionFiltInp1);
		distortionFiltInp1.connect(distortionFiltInp2);
		distortionFiltInp2.connect(distortionHC);
		distortionHC.connect(distortionLC);
		distortionLC.connect(distortionLevel);
		distortionLevel.connect(distortionMix);
		distortionMix.connect(distortionOutput);
		distortionInput2.connect(distortionDirect);
		distortionDirect.connect(distortionOutput);
	    
	    // distortionOutput.connect(delaysInput1);
	    modulationOutput.connect(delaysInput1);
	    
	    distortionOutput.connect(modulationInput1);
	    
	    delaysInput1.connect(delaysInput2);
	    delaysInput2.connect(delayInput1);
	    
	    delayInput1.connect(delayInput2);
	    delayInput2.connect(delay);
	    delayInput2.connect(delayDirect);
	    delay.connect(delayFiltInp1);
	    delayFiltInp1.connect(delayFiltInp2);
	    delayFiltInp2.connect(delayHC);
	    delayHC.connect(delayLC);
	    delayLC.connect(delayFiltOut);
	    delayFiltOut.connect(delayMix);
	    delayFiltOut.connect(delayFB);
	    delayFB.connect(delay);
	    delayDirect.connect(delayOutput);
	    delayMix.connect(delayOutput);
	    delayOutput.connect(ddInput1);
	    
	    ddInput1.connect(ddInput2);
	    ddInput2.connect(ddDirect);
	    
	    ddInput2.connect(ddInputA);
	    ddInputA.connect(ddFltInpA);
	    ddFltInpA.connect(ddHCA);
	    ddHCA.connect(ddLCA);
	    ddLCA.connect(ddA);
	    ddA.connect(ddAFB);
	    ddAFB.connect(ddFltInpA);
	    ddA.connect(ddAtoB);
	    ddAtoB.connect(ddFltInpB);
	    ddA.connect(ddAsplitter);
	    ddAsplitter.connect(ddApanRight,0);
	    ddAsplitter.connect(ddApanLeft,1);
	    ddApanLeft.connect(ddAmerger, 0, 0);
		ddApanRight.connect(ddAmerger, 0, 1);
	    ddAmerger.connect(ddAtoOut);
	    ddAtoOut.connect(ddMix);
	    
	    ddInput2.connect(ddInputB);
	    ddInputB.connect(ddFltInpB);
	    ddFltInpB.connect(ddHCB);
	    ddHCB.connect(ddLCB);
	    ddLCB.connect(ddB);
	    ddB.connect(ddBFB);
	    ddBFB.connect(ddFltInpB);
	    ddB.connect(ddBtoA);
	    ddBtoA.connect(ddFltInpA);
	    ddB.connect(ddBsplitter);
	    ddBsplitter.connect(ddBpanRight,0);
	    ddBsplitter.connect(ddBpanLeft,1);
	    ddBpanLeft.connect(ddBmerger, 0, 0);
		ddBpanRight.connect(ddBmerger, 0, 1);
	    ddBmerger.connect(ddBtoOut);
	    ddBtoOut.connect(ddMix);
	    ddDirect.connect(ddOutput);
	    ddMix.connect(ddOutput); 
	    
	    ddOutput.connect(delaysOutput);
	    // delaysOutput.connect(modulationInput1);
	    delaysOutput.connect(reverbInput1);
	    
	    // modulationInput1.connect(modulationInput2);
	    // modulationOutput.connect(reverbInput1);
	    
	    modulationInput2.connect(chorusInput1);
	    chorusInput1.connect(chorusInput2);
	    chorusInput2.connect(chorusDirect);
	    chorusDirect.connect(chorusOutput);
	    chorusInput2.connect(chorusSplitter);
	    chorusSplitter.connect(chorusDelayLeft, 0);
	    chorusSplitter.connect(chorusDelayRight, 1);
	    chorusDelayLeft.connect(chorusMerger, 0, 0);
	    chorusDelayRight.connect(chorusMerger, 0, 1);
	    chorusMerger.connect(chorusLC);
	    chorusLC.connect(chorusMix);
	    chorusLFO.connect(chorusLFOGain);
	    chorusLFOGain.connect(chorusDepth);
	    chorusDepth.connect(chorusDelayLeft.delayTime);
	    chorusDepth.connect(chorusInvert);
	    chorusInvert.connect(chorusDelayRight.delayTime);
	    chorusMix.connect(chorusOutput);
	    chorusOutput.connect(tremoloInput1);
	    
	    tremoloInput1.connect(tremoloInput2);
	    tremoloInput2.connect(tremoloDirect);
	    tremoloDirect.connect(tremoloOutput);
	    tremoloInput2.connect(tremoloMix);
	    tremoloMix.connect(tremoloSplitter);
	    tremoloSplitter.connect(tremoloAmpLeft, 0);
	    tremoloSplitter.connect(tremoloAmpRight, 1);
	    tremoloAmpLeft.connect(tremoloLeftLeft);
	    tremoloAmpLeft.connect(tremoloLeftRight);
	    tremoloAmpRight.connect(tremoloRightLeft);
	    tremoloAmpRight.connect(tremoloRightRight);
	    tremoloLeftLeft.connect(tremoloMerger, 0, 0);
	    tremoloLeftRight.connect(tremoloMerger, 0, 1);
	    tremoloRightLeft.connect(tremoloMerger, 0, 0);
	    tremoloRightRight.connect(tremoloMerger, 0, 1);
	    tremoloMerger.connect(tremoloOutput);
	    tremoloOutput.connect(modulationOutput);
	    tremoloLFO.connect(tremoloLFOAmp);
	    tremoloLFOAmp.connect(tremoloDepth);
	    tremoloLFO2.connect(tremoloLFO2Amp);
	    tremoloLFO2Amp.connect(tremoloDepth);
	    tremoloDepth.connect(tremoloAmpLeft.gain);
		tremoloDepth.connect(tremoloInvert);
	    tremoloInvert.connect(tremoloAmpRight.gain);
	    
	    reverbInput1.connect(reverbInput2);
	    reverbInput2.connect(reverbDelay);
	    reverbDelay.connect(reverbSplitter);
	    reverbSplitter.connect(convolverL, 0);
	    reverbSplitter.connect(convolverR, 1);
	    convolverL.connect(reverbLC);
	    convolverR.connect(reverbLC);
	    reverbLC.connect(reverbHC);
	    reverbHC.connect(reverbMix);
	    reverbInput2.connect(reverbDirect);
	    reverbDirect.connect(reverbOutput);
		reverbMix.connect(reverbOutput);
	    reverbOutput.connect(eqInput1);
	    
	    eqInput1.connect(eqInput2);
	    eqInput2.connect(eqHCInput1);
	    eqHCInput1.connect(eqHCInput2);
	    eqHCInput2.connect(eqHC);
	    eqHC.connect(eqHCOutput);
	    
	    eqHCOutput.connect(eqHSInput1);
	    eqHSInput1.connect(eqHSInput2);
	    eqHSInput2.connect(eqHS);
	    eqHS.connect(eqHSOutput);
	    
	    eqHSOutput.connect(eqP1Input1);
	    eqP1Input1.connect(eqP1Input2);
	    eqP1Input2.connect(eqP1);
	    eqP1.connect(eqP1Output);
	    eqP1Output.connect(eqP2Input1);
	    eqP2Input1.connect(eqP2Input2);
	    eqP2Input2.connect(eqP2);
	    eqP2.connect(eqP2Output);
	    eqP2Output.connect(eqLSInput1);
	    eqLSInput1.connect(eqLSInput2);
	    eqLSInput2.connect(eqLS);
	    eqLS.connect(eqLSOutput);
	    eqLSOutput.connect(eqLCInput1);
	    
	    eqLCInput1.connect(eqLCInput2);
	    eqLCInput2.connect(eqLC);
	    eqLC.connect(eqLCOutput);
	    eqLCOutput.connect(eqOutput);
	    
	    eqOutput.connect(effectsOutput);
	    	    
	    volumeInput1.connect(volumeInput2);
	    volumeInput2.connect(attenuateInput1);
	    
	    attenuateInput1.connect(attenuateInput2);
	    attenuateInput2.connect(volume);
	    volume.connect(attenuateOutput);
	    attenuateOutput.connect(limiterInput1);
	    
	    limiterInput1.connect(limiterInput2);
	    limiterInput2.connect(limiter);
	    limiter.connect(limiterOutput);
	    limiterOutput.connect(volumeOutput);
	    
	    volumeOutput.connect(postVolume);
	    postVolume.connect(context.destination);
	    
	    javascriptNode = context.createScriptProcessor(2048, 1, 1);
	    javascriptNode.connect(context.destination);
	    analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 256;
        volumeOutput.connect(analyser);
        analyser.connect(javascriptNode);
        ctx = $("#meterCanvas").get()[0].getContext("2d");
        gradient = ctx.createLinearGradient(0,0,0,300);
        gradient.addColorStop(1,'#28b06e');
        gradient.addColorStop(0.25,'#28b06e');
        gradient.addColorStop(0.15,'#fffc21');
        gradient.addColorStop(0,'#ff0000');
        
        // NOISE BUFFERS
        
        var bufferSize = 2 * context.sampleRate;
        noiseBufferW = context.createBuffer(1, bufferSize, context.sampleRate);
        outputW = noiseBufferW.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
	    	outputW[i] = Math.random() * 2 - 1
	    }
        
        noiseBufferP = context.createBuffer(1, bufferSize, context.sampleRate);
        outputP = noiseBufferP.getChannelData(0);
        var b0, b1, b2, b3, b4, b5, b6;
		b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
		for (var i = 0; i < bufferSize; i++) {
			var white = Math.random() * 2 - 1;
			b0 = 0.99886 * b0 + white * 0.0555179;
			b1 = 0.99332 * b1 + white * 0.0750759;
			b2 = 0.96900 * b2 + white * 0.1538520;
			b3 = 0.86650 * b3 + white * 0.3104856;
			b4 = 0.55000 * b4 + white * 0.5329522;
			b5 = -0.7616 * b5 - white * 0.0168980;
			outputP[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
			outputP[i] *= 0.11;
			b6 = white * 0.115926;
		}
        
        noiseBufferB = context.createBuffer(1, bufferSize, context.sampleRate);
        outputB = noiseBufferB.getChannelData(0);
        var lastOut = 0.0;
		for (var i = 0; i < bufferSize; i++) {
			var white = Math.random() * 2 - 1;
			outputB[i] = (lastOut + (0.02 * white)) / 1.02;
			lastOut = outputB[i];
			outputB[i] *= 3.5;
		}
        
        // LOAD PATCHES

        $.getJSON('patches/db-49.json', function(data) {
	        
	        userPatchList = new Array();
	        
	    	var patchListTags = new Array();
	    	
	    	// get list of patch types
	    	
	    	for (var i in data.patches) {
		    		            
	            for (var x in data.patches[i].tags) {
		            patchListTags.push(data.patches[i].tags[x]);
		        }
		        	            
	        }
	        
	        var uniqueTags = [];
	        $.each(patchListTags, function(i, el){
			    if($.inArray(el, uniqueTags) === -1) uniqueTags.push(el);
			});
			uniqueTags.sort();
			
			var outputTypes = "<option>user patches</option><option selected>all</option>";
			
			for (var i in uniqueTags) {
				outputTypes+='<option value="'+i+'">'+uniqueTags[i]+'</option>';
			}
			
	        document.getElementById('patchTypeDrop').innerHTML=outputTypes;
	        
	        // create list of patch names
	        	    	
	    	var outputAllPatches='';
	    	
	    	for (var i in data.patches) {
		    	
		    	typeClass="";
		    	
		    	for (var x in data.patches[i].tags) {
		            var tC = data.patches[i].tags[x];
		            var thisTag  = $.inArray(tC, uniqueTags);
		            typeClass+=" pt-"+thisTag;
		        }
		    	
	            outputAllPatches+="<div class='patchesName "+typeClass+"' data-url='"+ data.patches[i].url+"'>"+data.patches[i].url+": "+data.patches[i].patchName+"</div>";
		        	            
	        }
	        
	        // outputAllPatches+="<div style='clear:both'></div>"
	        
			document.getElementById('patchesList').innerHTML=outputAllPatches;
			
			$.getJSON("patches/db/001.json", function(data) {
			    var patchOld = data;
		        patch = patchFix(patchOld);
		        patch2HTML();
		        updatePatch();
		        document.getElementById('currentPatchName').innerHTML="001: light show";
			});
	        	        	        
	        $('#patchesList > div:eq(1)').addClass('on');
	        
	        // iOS 9 hide test

	        var ua = navigator.userAgent;
			var uaindex;
			if ( ua.match(/iPad/i) || ua.match(/iPhone/i) )
			{
			    var uaindex = ua.indexOf( 'OS ' );
			    var userOSver = ua.substr( uaindex + 3, 3 ).replace( '_', '.' );
			    var userOSverNum = Number(userOSver);
			    if (userOSverNum < 9){$("#ios9fix").hide()}
			} else {$("#ios9fix").hide()}
			
			// Chrome 2018 hide test
			console.log(ua);
			
			var isChromium = window.chrome;
			var winNav = window.navigator;
			var vendorName = winNav.vendor;
			var isOpera = typeof window.opr !== "undefined";
			var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
			var isIOSChrome = winNav.userAgent.match("CriOS");
			
			if (isIOSChrome) {
			   // is Google Chrome on IOS
			} else if(
			  isChromium !== null &&
			  typeof isChromium !== "undefined" &&
			  vendorName === "Google Inc." &&
			  isOpera === false &&
			  isIEedge === false
			) {
			   // is Google Chrome
			} else { 
			   $("#userInit").hide()
			}
			
			
			
	        $("#preload").fadeOut( "slow" );
						        
	    });
        
        
        // INITALIZE MIDI
        
        lowMidi = 48;
        midiLowMidi = false;
        midiChannel = 1;
        
        function onMIDIInit(midi) {
	      midiAccess = midi;
	
	      var haveAtLeastOneDevice=false;
	      var inputs=midiAccess.inputs.values();
	      for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
	        input.value.onmidimessage = MIDIMessageEventHandler;
	        haveAtLeastOneDevice = true;
	        $('.midiError').hide();
	        $('.midiBox').show();
	      }
	      if (!haveAtLeastOneDevice){
	      	document.getElementById("midiErrorMsg").innerHTML = "<b>Error:</b> No MIDI input devices present.<br /> <b>Possible solution:</b> Quit your browser, connect a MIDI device, and restart your browser.<br /><hr>";
	        }
	    }
	
	    function onMIDIReject(err) {
	    	document.getElementById("midiErrorMsg").innerHTML = "Error: The MIDI system failed to start.";
	    }
	    
	    function updateScroll(){
		    var element = document.getElementById("midiData");
		    element.scrollTop = element.scrollHeight;
		}
		
		var midiLo = 128;
		var midiHi = 0;
		
	    
	    function MIDIMessageEventHandler(event) {
	    	      
	      // highlight midi activity
	      
	      document.getElementById("midiActivity").classList.add("on");
		  setTimeout(function() { document.getElementById("midiActivity").classList.remove("on") }, 250);	      
	      
	      var inMidiChannel = (event.data[0] & 0xf) + 1;
	      
	      	      
	      switch (event.data[0] & 0xf0) {
	        case 0x90:
	          if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
	          	if (event.data[1] < midiLo){midiLo = event.data[1]};
	          	if (event.data[1] > midiHi){midiHi = event.data[1]};
	          	var midiDif = midiHi - midiLo;
	          	var midiD = '<span>channel: ' + inMidiChannel + ', note: ' + event.data[1] + ', velocity: ' + event.data[2] + ', lowest: ' + midiLo + ', highest: ' + midiHi + ', difference: ' + midiDif + '<span><br>';
		        $('#midiData').append(midiD);
		        updateScroll();
	          	
	          	var velocity = event.data[2] * .007874;
	          	velocity = velocity.toFixed(4);
	          	if (inMidiChannel == midiChannel){
		            if(midiLowMidi === false){
		            	var i = event.data[1] - lowMidi;
			            if (i > -1 && i < patch.trig_pads){
				            keyboardInputDown[i] = "on";
							$("#buttonContainer").children().eq(i).addClass("depressed");
						    wsPitch = patch.trig_p[i];
							var voice = new Voice(wsPitch, velocity);
							active_voices[i] = voice;
							voice.start();
						}
					} else {
						midiLowMidi = false;
						$('#getMidiFromMidi').prop('disabled', false);
						var i = event.data[1];
						lowMidi = i;
						$('#lowMidi').val(i);
					}
				};
	            return;
	          }
	          // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
	        case 0x80:
		      $('#midiData').append(midiD);
		      updateScroll();
		      
	          var i = event.data[1] - lowMidi;
	          keyboardInputDown[i] = "off";
	          if (i > -1 && i < patch.trig_pads){
				  $("#buttonContainer").children().eq(i).removeClass("depressed");
						
				  if (typeof active_voices[i] != "undefined") {
					active_voices[i].stop(); 
					delete active_voices[i];
				  }
			  }
	          return;
	      }
	    }

        
        if (navigator.requestMIDIAccess){
        	navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
        } else {
        	document.getElementById("midiErrorMsg").innerHTML = "Error: No MIDI support present in your browser.";
        }
	        
	  
	    
        
	  }
	  catch(e) {
	    alert('Web Audio API is not supported in this browser. Please use the current version of Google Chrome, Safari or Firefox.');
	  }	  
	  
	}
	
	init();
	
	// DRAW METERS
	
	javascriptNode.onaudioprocess = function() {
	
		if (patch.meters_switch == "on") {

        // get the average for the first channel
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);

        // clear the current state
        ctx.clearRect(0, 0, 1000, 325);

        // set the fill style
        ctx.fillStyle=gradient;
        drawSpectrum(array);
        
        }
        
	}


    function drawSpectrum(array) {
    	var barWidth = $("#meterCanvas").width() / (array.length/1.5);
        for ( var i = 0; i < (array.length/1.5); i++ ){
            var value = array[i];
            ctx.fillRect(i*barWidth,255-value,barWidth,150);
        }
    }
    
    // PANNER FUNCTION
    
    var PANNER = (function(context) {
    
	  function PANNER(x) {
		this.inp = context.createGain();
		
	  	this.panLeft = context.createGain();
	  	this.panRight = context.createGain();
	  	this.merger = context.createChannelMerger(2);
	  	this.panLeft.gain.value = ( x * -0.005 ) + 0.5;
	  	this.panRight.gain.value = ( x * 0.005 ) + 0.5;
	  	this.out = context.createGain();
	  		  	
	    this.inp.connect(this.panRight);
	    this.inp.connect(this.panLeft);
	    
	    this.panRight.connect(this.merger, 0, 1);
		this.panLeft.connect(this.merger, 0, 0);
	    this.merger.connect(this.out);
	  	
	  	this.input = this.inp;
	    this.output = this.out;
	    
	  };
	
	  return PANNER;
	})(context);
	
	
	// LFORANDOM FUNCTION 
    
    var LFORANDOM = (function(context) {
    
	  function LFORANDOM(x,s) {
	  	  
	  	if(s === undefined){var s=0}; // s=slide
	  	this.totalSteps = 50;
  		this.holdTime = 1 / x; // x= frequency
  		this.holdSamples = Math.round(this.holdTime * context.sampleRate);
  		this.slideSamples = Math.round(this.holdSamples * (s * .01));
  		this.bufferSize = this.totalSteps * this.holdSamples;
  		this.noiseBuffer = context.createBuffer(1, this.bufferSize, context.sampleRate);
  		this.outputNoise = this.noiseBuffer.getChannelData(0);
  		
  		var thisStep = Math.random() * 2 - 1;
  		
  		for (var i = 0; i < this.totalSteps; i++) {
  		
	    	var nextStep = Math.random() * 2 - 1;
	    	
	    	var slideAmount = 1;
	    	
	    	if (this.slideSamples != 0){
	    		slideAmount = (nextStep - thisStep) / this.slideSamples;
	    	}
	    	
	    	for (var j = 0; j < this.holdSamples; j++) {
	    		if (j < this.slideSamples){
	    			this.outputNoise[(i * this.holdSamples) + j] = thisStep + (slideAmount * j);
	    		} else {
	    			this.outputNoise[(i * this.holdSamples) + j] = nextStep;
	    		}
	    	}
	    	
	    	thisStep = nextStep;
	    	
	    }

	    this.noise = context.createBufferSource();
	    this.noise.buffer = this.noiseBuffer;
      	this.noise.loop = true;	      	
      	this.noise.start(0);
      	
	    this.output = this.noise;
	  };
	
	  return LFORANDOM;
	})(context);
	
	// PULSE WIDTH MODULATION PWM
	
		//Pre-calculate the WaveShaper curves so that we can reuse them.
		var pulseCurve=new Float32Array(256);
		for(var i=0;i<128;i++) {
		  pulseCurve[i]= -1;
		  pulseCurve[i+128]=1;
		}
		var constantOneCurve=new Float32Array(2);
		constantOneCurve[0]=1;
		constantOneCurve[1]=1;
		
		//Add a new factory method to the AudioContext object.
		context.createPulseOscillator=function(){
		  //Use a normal oscillator as the basis of our new oscillator.
		  var node=this.createOscillator();
		  node.type="sawtooth";
		
		  //Shape the output into a pulse wave.
		  var pulseShaper=context.createWaveShaper();
		  pulseShaper.curve=pulseCurve;
		  node.connect(pulseShaper);
		
		  //Use a GainNode as our new "width" audio parameter.
		  var widthGain=context.createGain();
		  widthGain.gain.value=0; //Default width.
		  node.width=widthGain.gain; //Add parameter to oscillator node.
		  widthGain.connect(pulseShaper);
		
		  //Pass a constant value of 1 into the widthGain â€“ so the "width" setting
		  //is duplicated to its output.
		  var constantOneShaper=this.createWaveShaper();
		  constantOneShaper.curve=constantOneCurve;
		  node.connect(constantOneShaper);
		  constantOneShaper.connect(widthGain);
		
		  //Override the oscillator's "connect" and "disconnect" method so that the
		  //new node's output actually comes from the pulseShaper.
		  node.connect=function() {
		    pulseShaper.connect.apply(pulseShaper, arguments);
		  }
		  node.disconnect=function() {
		    pulseShaper.disconnect.apply(pulseShaper, arguments);
		  }
		
		  return node;
		}
	

  var Voice = (function(context) {
    function Voice(frequency, velocity){
      this.frequency = frequency;
      this.velocity = velocity;
      this.oscillators = [];
      this.oscillatorsNew = [];
    };
    
    // ==================== 
    //      PLAY SOUND      
    // ==================== 

    Voice.prototype.start = function() {
    	var now = context.currentTime;
    	var trackForStop = new Array();
    	var trackGains = new Array();
    	trackForStop.thisPitch = this.frequency;
    	    	
    	// OSCILLATORS LOOP
    	
    	var audObjs = [];
    	
    	for (var oscL=0; oscL<3; oscL++){
    	
    		var osc = 'osc' + (oscL+1);
    		var thisOsc = guiTotal[osc];
    		    		
    		if (patch[osc+'_switch'] == 'on'){
    		
    			// PITCH
    			if (patch[osc+'_freqSwitch'] == 'on'){
		    		var pitchShift = Math.pow(2, patch[osc+'_pitchFine'] * .01);
				    var frequencyOct = (this.frequency * patch[osc+'_octave']) * pitchShift;
				} else {
					var frequencyOct = this.frequency;
				}
	    		
	    		// OSCILLATORS VCAS
	    		
		      	audObjs[osc+'_VCA'] = context.createGain(); // for OSC amplitude
		      	trackGains.push(audObjs[osc+'_VCA']);
		      	var thisVCA = audObjs[osc+'_VCA'];
		      	if (patch[osc+'_ampSwitch'] == 'on'){thisVCA.gain.value = patch[osc+'_Amp'] * .01}
		      	audObjs[osc+'_VCA2'] = context.createGain(); // for OSC amplitude LFO
		      	var thisVCA2 = audObjs[osc+'_VCA2'];
		      	trackGains.push(audObjs[osc+'_VCA2']);
		      	audObjs[osc+'_VCA3'] = context.createGain(); // for OSC amplitude envelope
		      	var thisVCA3 = audObjs[osc+'_VCA3'];
		      	trackGains.push(audObjs[osc+'_VCA3']);
		      	trackForStop[osc+'_VCA3'] = audObjs[osc+'_VCA3'];
		      	
		      	audObjs[osc+'_VCA4'] = context.createGain(); // for OSC pan
		      	var thisVCA4 = audObjs[osc+'_VCA4'];
		      	trackGains.push(audObjs[osc+'_VCA4']);
		      	trackForStop[osc+'_VCA4'] = audObjs[osc+'_VCA4'];
		      	
		      	audObjs[osc+'_VCA5'] = context.createGain(); // for OSC convolver
		      	var thisVCA5 = audObjs[osc+'_VCA5'];
		      	trackGains.push(audObjs[osc+'_VCA5']);
		      	trackForStop[osc+'_VCA5'] = audObjs[osc+'_VCA5'];
		      	
		      	audObjs[osc+'_VCA6'] = context.createGain(); // for OSC eq
		      	var thisVCA6 = audObjs[osc+'_VCA6'];
		      	trackGains.push(audObjs[osc+'_VCA6']);
		      	trackForStop[osc+'_VCA6'] = audObjs[osc+'_VCA6'];
		      	
		      	thisVCA.connect(thisVCA2);
		      	thisVCA2.connect(thisVCA3);
		      	thisVCA3.connect(thisVCA4);
		      	thisVCA4.connect(thisVCA5);
		      	thisVCA5.connect(thisVCA6);
		      	
		      	// CREATE FREQUENCY-FOLLOW FILTER
		      	
		      	if (patch[osc+'_freqFltSwitch'] == 'on'){
		      		audObjs[osc+'_freqFlt'] = context.createBiquadFilter();
		      		trackForStop[osc+'_freqFlt'] = audObjs[osc+'_freqFlt'];
		      		audObjs[osc+'_freqFlt']['type'] = patch[osc+'_freqFltType'];
		      		audObjs[osc+'_freqFlt']['frequency']['value'] = frequencyOct;
		      		audObjs[osc+'_freqFlt']['Q']['value'] = patch[osc+'_freqFltQ'];
		      		audObjs[osc+'_freqFltWet'] = context.createGain();
		      		trackGains.push(audObjs[osc+'_freqFltWet']);
		      		audObjs[osc+'_freqFltWet']['gain']['value'] = patch[osc+'_freqFltMix'] *.01;
		      		audObjs[osc+'_freqFltDry'] = context.createGain();
		      		trackGains.push(audObjs[osc+'_freqFltDry']);
		      		audObjs[osc+'_freqFltDry']['gain']['value'] = 1 - (patch[osc+'_freqFltMix'] *.01);
		      		
		        	audObjs[osc+'_freqFlt'].connect(audObjs[osc+'_freqFltWet']);
		        	audObjs[osc+'_freqFltWet'].connect(audObjs[osc+'_VCA']);
		        	audObjs[osc+'_freqFltDry'].connect(audObjs[osc+'_VCA']);
			        			      		
		      		if (patch[osc+'_freqSwitch'] == 'on' && patch[osc+'_pmeSwitch'] == 'on'){
		      			var pmeTimeCalc = 0;
			      		if (patch[osc+'_pmeDelaySwitch'] == 'on'){pmeTimeCalc = patch[osc+'_pmeDelay']}
			      		if (patch[osc+'_pmeAttackSwitch'] == 'on'){
			      			var pmeI = Math.pow(2, patch[osc+'_pmeInitial'] * .01);
			      			audObjs[osc+'_freqFlt'].frequency.value = frequencyOct * pmeI;
			      			audObjs[osc+'_freqFlt'].frequency.setValueAtTime(audObjs[osc+'_freqFlt'].frequency.value, now);
			      			audObjs[osc+'_freqFlt'].frequency.setValueAtTime(audObjs[osc+'_freqFlt'].frequency.value, now + pmeTimeCalc);
			      			audObjs[osc+'_freqFlt'].frequency.linearRampToValueAtTime(frequencyOct, now + pmeTimeCalc + patch[osc+'_pmeAttack']);
			      			pmeTimeCalc = pmeTimeCalc + patch[osc+'_pmeAttack'];
			      		} else { audObjs[osc+'_freqFlt'].frequency.setValueAtTime(audObjs[osc+'_freqFlt'].frequency.value, now + pmeTimeCalc) }
			      		if (patch[osc+'_pmeReleaseSwitch'] == "on" && patch[osc+'_pmeSustainSwitch'] == "off"){
			      			var pmeT = Math.pow(2, patch[osc+'_pmeTerminal'] * .01);
			      			var pmee = frequencyOct*pmeT;
			      			if (pmee < 15){pmee = 15};
			      			audObjs[osc+'_freqFlt'].frequency.linearRampToValueAtTime(pmee, now + pmeTimeCalc + patch[osc+'_pmeRelease']);
			      		}
			      	}
		      		
		      	}
		      	
		      	// OSCILLATORS NOISE
		      		    	
		    	if (patch[osc+'_noise'] == 'on' && patch[osc+'_shapeSwitch'] == 'on'){
		    		
		    		audObjs[osc+'_noise'] = context.createBufferSource();
		    		trackForStop[osc+'_noise'] = audObjs[osc+'_noise'];
		    		if (patch[osc+'_wave'] == "nw"){audObjs[osc+'_noise']['buffer'] = noiseBufferW}
		    		if (patch[osc+'_wave'] == "np"){audObjs[osc+'_noise']['buffer'] = noiseBufferP}
		    		if (patch[osc+'_wave'] == "nb"){audObjs[osc+'_noise']['buffer'] = noiseBufferB}
		    		audObjs[osc+'_noise']['loop'] = true;
		    		
		      		
	      			var thisNoise = audObjs[osc+'_noise'];
	      			if (patch[osc+'_freqFltSwitch'] == 'on'){
			        	thisNoise.connect(audObjs[osc+'_freqFlt']);
			        	thisNoise.connect(audObjs[osc+'_freqFltDry']);
			        } else {
			        	thisNoise.connect(thisVCA)
			        }
			      	
		    		// osc1_superSwitch, osc1_superNumber, osc1_superShift, osc1_superWidth
		    		
		    	} else if (patch[osc+'_superSwitch'] == 'on' && !(patch[osc+'_wave'] == 'square' && patch[osc+'_pulseSwitch'] == 'on')){
		    				    		
			    	// OSCILLATORS SUPER SAW OSCILLATORS
			    	
			    	audObjs[osc+'_SS'] = new Array();
			    	audObjs[osc+'SSPanVal'] = new Array();
			    	audObjs[osc+'SSPan'] = new Array();
			    	audObjs[osc+'SSVal'] = new Array();
			    	
			    	var superNumber = patch[osc+'_superNumber'];
			    	var panDif = patch[osc+'_superWidth'] / (( superNumber - 1) / 2 );
			    	var panStart = patch[osc+'_superWidth'] * -1;
			    	var valDif = patch[osc+'_superShift'] / (( superNumber - 1) / 2 );
			    	var valStart = 1 - patch[osc+'_superShift'];
			    	
			    	for (var i = 0; i < superNumber; i++) {
			    		audObjs[osc+'SSPanVal'].push(panStart + (panDif * i));
			    		audObjs[osc+'SSVal'].push(valStart + (valDif * i));
			    	}
			    	
			    	for (var i = 0; i < superNumber; i +=2) {
			    		audObjs[osc+'SSPanVal'][i] = Number(audObjs[osc+'SSPanVal'][i]) * -1;
			    	}
			    		
			    	for (var i = 0; i < superNumber; i++) {
						audObjs[osc+'_SS'][i] = context.createOscillator();
						if (patch[osc+'_shapeSwitch'] == 'on'){audObjs[osc+'_SS'][i].type = patch[osc+'_wave']} else {audObjs[osc+'_SS'][i].type = 'sine'}
						audObjs[osc+'_SS'][i].frequency.value = frequencyOct * audObjs[osc+'SSVal'][i];
						audObjs[osc+'SSPan'][i] = new PANNER(audObjs[osc+'SSPanVal'][i]);
						audObjs[osc+'_SS'][i].connect(audObjs[osc+'SSPan'][i].input);
						var thisVCA = audObjs[osc+'_VCA'];
						
						if (patch[osc+'_freqFltSwitch'] == 'on'){
				        	audObjs[osc+'SSPan'][i].output.connect(audObjs[osc+'_freqFlt']);
				        	audObjs[osc+'SSPan'][i].output.connect(audObjs[osc+'_freqFltDry']);
				        } else {
				        	audObjs[osc+'SSPan'][i].output.connect(thisVCA)
				        }
						
						trackGains.push(audObjs[osc+'SSPan'][i].inp);
						trackGains.push(audObjs[osc+'SSPan'][i].out);
						trackGains.push(audObjs[osc+'SSPan'][i].panLeft);
						trackGains.push(audObjs[osc+'SSPan'][i].panRight);
						
						// OSCILLATORS SUPER SAW PITCH MODULATION ENVELOPE
						
						if (patch[osc+'_pmeSwitch'] == 'on'){
				      		var pmeTimeCalc = 0;
				      		if (patch[osc+'_pmeDelaySwitch'] == 'on'){pmeTimeCalc = patch[osc+'_pmeDelay']}
				      		if (patch[osc+'_pmeAttackSwitch'] == 'on'){
				      			var pmeI = Math.pow(2, patch[osc+'_pmeInitial'] * .01);
				      			audObjs[osc+'_SS'][i].frequency.value = frequencyOct * pmeI;
				      			audObjs[osc+'_SS'][i].frequency.setValueAtTime(audObjs[osc+'_SS'][i].frequency.value, now);
				      			audObjs[osc+'_SS'][i].frequency.setValueAtTime(audObjs[osc+'_SS'][i].frequency.value, now + pmeTimeCalc);
				      			audObjs[osc+'_SS'][i].frequency.linearRampToValueAtTime(frequencyOct * audObjs[osc+'SSVal'][i], now + pmeTimeCalc + patch[osc+'_pmeAttack']);
				      			pmeTimeCalc = pmeTimeCalc + patch[osc+'_pmeAttack'];
				      		} else { audObjs[osc+'_SS'][i].frequency.setValueAtTime(audObjs[osc+'_SS'][i].frequency.value, now + pmeTimeCalc) }
				      		if (patch[osc+'_pmeReleaseSwitch'] == "on" && patch[osc+'_pmeSustainSwitch'] == "off"){
				      			var pmeT = Math.pow(2, patch[osc+'_pmeTerminal'] * .01);
				      			var pmee = frequencyOct * pmeT * audObjs[osc+'SSVal'][i];
				      			if (pmee < 15){pmee = 15 * audObjs[osc+'SSVal'][i]};
				      			audObjs[osc+'_SS'][i].frequency.linearRampToValueAtTime(pmee, now + pmeTimeCalc + patch[osc+'_pmeRelease']);
				      		}
				      	}
						
					}
					
					trackForStop[osc+'_SS'] = audObjs[osc+'_SS'];
		
		        } else if(patch[osc+'_shapeSwitch'] == 'on' && patch[osc+'_wave'] == 'square' && patch[osc+'_pulseSwitch'] == 'on'){

			        // PULSE WIDTH
			        
			        audObjs[osc+'_vco'] = context.createPulseOscillator();
			        audObjs[osc+'_vco'].frequency.value = frequencyOct;
			        audObjs[osc+'_vco'].width.value = patch[osc+'_pulseWidth'];
			        
			        if (patch[osc+'_freqFltSwitch'] == 'on'){
			        	audObjs[osc+'_vco'].connect(audObjs[osc+'_freqFlt']);
			        	audObjs[osc+'_vco'].connect(audObjs[osc+'_freqFltDry']);
			        } else {
			        	audObjs[osc+'_vco'].connect(audObjs[osc+'_VCA'])
			        }
			        
			        // PULSE WIDTH MODULATION
			        
	    			
	    			if (patch[osc+'_pulselSwitch'] == 'on'){
		    			
		    			audObjs[osc+'_pulselfoGain'] = context.createGain();
			      		trackGains.push(audObjs[osc+'_pulselfoGain']);
			      		trackForStop[osc+'_pulselfoGain'] = audObjs[osc+'_pulselfoGain'];
			      		
			      		audObjs[osc+'_pulselfoGain'].connect(audObjs[osc+'_vco'].width)
			      		
			      		if (patch[osc+'_pulselOptions'] == 'basic') {
			      		
			      			audObjs[osc+'_pulselfoGain'].gain.value = patch[osc+'_pulselAmount'];
			      		
			      		} else {
			      			      		
			      			if (patch[osc+'_pulselEnvSwitch'] == 'on') {
			      				var pulselfoGainTime = 0;
						      	audObjs[osc+'_pulselfoGain'].gain.value = 0;
						      	audObjs[osc+'_pulselfoGain'].gain.setValueAtTime(0, now);
						      	if (patch[osc+'_pulselDelaySwitch'] == 'on') {
						      		pulselfoGainTime = Number(patch[osc+'_pulselDelay']);
						      		audObjs[osc+'_pulselfoGain'].gain.setValueAtTime(0, now + pulselfoGainTime);
						      	}
						      	if (patch[osc+'_pulselAttackSwitch'] == 'on') {
						      		pulselfoGainTime = pulselfoGainTime + Number(patch[osc+'_pulselAttack']);
						      	}
						      	audObjs[osc+'_pulselfoGain'].gain.linearRampToValueAtTime(patch[osc+'_pulselAmount'], now + pulselfoGainTime);
						      	if (patch[osc+'_pulselSustainSwitch'] == 'off' && patch[osc+'_pulselReleaseSwitch'] == 'on') {
						      		pulselfoGainTime = pulselfoGainTime + Number(patch[osc+'_pulselRelease']);
						      		audObjs[osc+'_pulselfoGain'].gain.linearRampToValueAtTime(0, now + pulselfoGainTime);
						      	}
						    } else {
						    	audObjs[osc+'_pulselfoGain'].gain.value = patch[osc+'_pulselAmount'];
						    }
					      	
					    }
			      	
			      		if (patch[osc+'_pulselShape'] != 'rnd' || patch[osc+'_pulselOptions'] == 'basic') {
						    if(osc == 'osc1'){osc1_pulselfoGain.connect(audObjs[osc+'_pulselfoGain'])};
					      	if(osc == 'osc2'){osc2_pulselfoGain.connect(audObjs[osc+'_pulselfoGain'])};
					      	if(osc == 'osc3'){osc3_pulselfoGain.connect(audObjs[osc+'_pulselfoGain'])};
					      	
				      	} else {  
					      	
					      	// RANDOM LFO
					      	audObjs[osc+'_noisePulsel'] = new LFORANDOM(patch[osc+'_pulselFreq'], patch[osc+'_pulselSlide']);
					      	audObjs[osc+'_noisePulsel'].output.connect(audObjs[osc+'_pulselfoGain']);
					      	trackForStop[osc+'_pulselfoR'] = audObjs[osc+'_noisePulsel'].noise;
					      	panicVoices.push(audObjs[osc+'_noisePulsel'].noise);
					      	
				      	}
			      	
				      	if (patch[osc+'_superSwitch'] != 'on' && patch[osc+'_noise'] != 'on') {
					      	audObjs[osc+'_pulselfoGain'].connect(audObjs[osc+'_vco'].frequency);
				      	} else if (patch[osc+'_superSwitch'] == 'on'  && patch[osc+'_noise'] != 'on') {
					      	/*
				      		var arrayLength = audObjs[osc+'_SS'].length;
							for (var i = 0; i < arrayLength; i++) {
							    audObjs[osc+'_pmlfoGain'].connect(audObjs[osc+'_SS'][i].frequency);
							}
							*/
				      	} else if (patch[osc+'_noiseFilt'] != 'off') {
							// audObjs[osc+'_pmlfoGain'].connect(audObjs[osc+'_noiseFilt'].frequency);
				      	}
				      	
		    			
	    			}
			        
			        // PULSE WIDTH PITCH MODULATION ENVELOPE
		      	
			      	if (patch[osc+'_pmeSwitch'] == 'on' && patch[osc+'_freqSwitch'] == 'on'){
			      		var pmeTimeCalc = 0;
			      		if (patch[osc+'_pmeDelaySwitch'] == 'on'){pmeTimeCalc = patch[osc+'_pmeDelay']}
			      		if (patch[osc+'_pmeAttackSwitch'] == 'on'){
			      			var pmeI = Math.pow(2, patch[osc+'_pmeInitial'] * .01);
			      			audObjs[osc+'_vco'].frequency.value = frequencyOct * pmeI;
			      			audObjs[osc+'_vco'].frequency.setValueAtTime(audObjs[osc+'_vco'].frequency.value, now);
			      			audObjs[osc+'_vco'].frequency.setValueAtTime(audObjs[osc+'_vco'].frequency.value, now + pmeTimeCalc);
			      			audObjs[osc+'_vco'].frequency.linearRampToValueAtTime(frequencyOct, now + pmeTimeCalc + patch[osc+'_pmeAttack']);
			      			pmeTimeCalc = pmeTimeCalc + patch[osc+'_pmeAttack'];
			      		} else { audObjs[osc+'_vco'].frequency.setValueAtTime(audObjs[osc+'_vco'].frequency.value, now + pmeTimeCalc) }
			      		if (patch[osc+'_pmeReleaseSwitch'] == "on" && patch[osc+'_pmeSustainSwitch'] == "off"){
			      			var pmeT = Math.pow(2, patch[osc+'_pmeTerminal'] * .01);
			      			var pmee = frequencyOct*pmeT;
			      			if (pmee < 15){pmee = 15};
			      			audObjs[osc+'_vco'].frequency.linearRampToValueAtTime(pmee, now + pmeTimeCalc + patch[osc+'_pmeRelease']);
			      		}
			      	}
			      	
			    } else {
		        
			        // OSCILLATORS STANDARD OSCILLATOR
			        
			        audObjs[osc+'_vco'] = context.createOscillator();
			        trackForStop[osc+'_vco'] = audObjs[osc+'_vco'];
			        if (patch[osc+'_shapeSwitch'] == 'on'){audObjs[osc+'_vco'].type = patch[osc+'_wave']} else {audObjs[osc+'_vco'].type = 'sine'}
			        
			        audObjs[osc+'_vco'].frequency.value = frequencyOct;
			        
			        if (patch[osc+'_freqFltSwitch'] == 'on'){
			        	audObjs[osc+'_vco'].connect(audObjs[osc+'_freqFlt']);
			        	audObjs[osc+'_vco'].connect(audObjs[osc+'_freqFltDry']);
			        } else {
			        	audObjs[osc+'_vco'].connect(audObjs[osc+'_VCA'])
			        }
			        
			        // OSCILLATORS STANDARD OSCILLATOR PITCH MODULATION ENVELOPE
		      	
			      	if (patch[osc+'_pmeSwitch'] == 'on' && patch[osc+'_freqSwitch'] == 'on'){
			      		var pmeTimeCalc = 0;
			      		if (patch[osc+'_pmeDelaySwitch'] == 'on'){pmeTimeCalc = patch[osc+'_pmeDelay']}
			      		if (patch[osc+'_pmeAttackSwitch'] == 'on'){
			      			var pmeI = Math.pow(2, patch[osc+'_pmeInitial'] * .01);
			      			audObjs[osc+'_vco'].frequency.value = frequencyOct * pmeI;
			      			audObjs[osc+'_vco'].frequency.setValueAtTime(audObjs[osc+'_vco'].frequency.value, now);
			      			audObjs[osc+'_vco'].frequency.setValueAtTime(audObjs[osc+'_vco'].frequency.value, now + pmeTimeCalc);
			      			audObjs[osc+'_vco'].frequency.linearRampToValueAtTime(frequencyOct, now + pmeTimeCalc + patch[osc+'_pmeAttack']);
			      			pmeTimeCalc = pmeTimeCalc + patch[osc+'_pmeAttack'];
			      		} else { audObjs[osc+'_vco'].frequency.setValueAtTime(audObjs[osc+'_vco'].frequency.value, now + pmeTimeCalc) }
			      		if (patch[osc+'_pmeReleaseSwitch'] == "on" && patch[osc+'_pmeSustainSwitch'] == "off"){
			      			var pmeT = Math.pow(2, patch[osc+'_pmeTerminal'] * .01);
			      			var pmee = frequencyOct*pmeT;
			      			if (pmee < 15){pmee = 15};
			      			audObjs[osc+'_vco'].frequency.linearRampToValueAtTime(pmee, now + pmeTimeCalc + patch[osc+'_pmeRelease']);
			      		}
			      	}
	
		      	}
		      	
		      
		      	// OSCILLATORS PITCH MODULATION LFO
		      	
		      	if (patch[osc+'_pmlSwitch'] == 'on' && patch[osc+'_freqSwitch'] == 'on'){
		      	
		      		audObjs[osc+'_pmlfoGain'] = context.createGain();
		      		trackGains.push(audObjs[osc+'_pmlfoGain']);
		      		trackForStop[osc+'_pmlfoGain'] = audObjs[osc+'_pmlfoGain'];
		      		
		      		if (patch[osc+'_pmlOptions'] == 'basic') {
		      		
		      			audObjs[osc+'_pmlfoGain'].gain.value = patch[osc+'_pmlAmount'];
		      		
		      		} else {
		      			      		
		      			if (patch[osc+'_pmlEnvSwitch'] == 'on') {
		      				var pmlfoGainTime = 0;
					      	audObjs[osc+'_pmlfoGain'].gain.value = 0;
					      	audObjs[osc+'_pmlfoGain'].gain.setValueAtTime(0, now);
					      	if (patch[osc+'_pmlDelaySwitch'] == 'on') {
					      		pmlfoGainTime = Number(patch[osc+'_pmlDelay']);
					      		audObjs[osc+'_pmlfoGain'].gain.setValueAtTime(0, now + pmlfoGainTime);
					      	}
					      	if (patch[osc+'_pmlAttackSwitch'] == 'on') {
					      		pmlfoGainTime = pmlfoGainTime + Number(patch[osc+'_pmlAttack']);
					      	}
					      	audObjs[osc+'_pmlfoGain'].gain.linearRampToValueAtTime(patch[osc+'_pmlAmount'], now + pmlfoGainTime);
					      	if (patch[osc+'_pmlSustainSwitch'] == 'off' && patch[osc+'_pmlReleaseSwitch'] == 'on') {
					      		pmlfoGainTime = pmlfoGainTime + Number(patch[osc+'_pmlRelease']);
					      		audObjs[osc+'_pmlfoGain'].gain.linearRampToValueAtTime(0, now + pmlfoGainTime);
					      	}
					    } else {
					    	audObjs[osc+'_pmlfoGain'].gain.value = patch[osc+'_pmlAmount'];
					    }
				      	
				    }
		      	
		      		if (patch[osc+'_pmlShape'] != 'rnd' || patch[osc+'_pmlOptions'] == 'basic') {
					    if(osc == 'osc1'){osc1_pmlfoGain.connect(audObjs[osc+'_pmlfoGain'])};
				      	if(osc == 'osc2'){osc2_pmlfoGain.connect(audObjs[osc+'_pmlfoGain'])};
				      	if(osc == 'osc3'){osc3_pmlfoGain.connect(audObjs[osc+'_pmlfoGain'])};
				      	
			      	} else {  
				      	
				      	// RANDOM LFO
				      	audObjs[osc+'_noisePml'] = new LFORANDOM(patch[osc+'_pmlFreq'], patch[osc+'_pmlSlide']);
				      	audObjs[osc+'_noisePml'].output.connect(audObjs[osc+'_pmlfoGain']);
				      	trackForStop[osc+'_pmlfoR'] = audObjs[osc+'_noisePml'].noise;
				      	panicVoices.push(audObjs[osc+'_noisePml'].noise);
				      	
			      	}
		      	
			      	if (patch[osc+'_superSwitch'] != 'on' && patch[osc+'_noise'] != 'on') {
				      	audObjs[osc+'_pmlfoGain'].connect(audObjs[osc+'_vco'].frequency);
			      	} else if (patch[osc+'_superSwitch'] == 'on'  && patch[osc+'_noise'] != 'on') {
			      		var arrayLength = audObjs[osc+'_SS'].length;
						for (var i = 0; i < arrayLength; i++) {
						    audObjs[osc+'_pmlfoGain'].connect(audObjs[osc+'_SS'][i].frequency);
						}
			      	} else if (patch[osc+'_noiseFilt'] != 'off') {
						// audObjs[osc+'_pmlfoGain'].connect(audObjs[osc+'_noiseFilt'].frequency);
			      	}
			      	
			      	if (patch[osc+'_freqFltSwitch'] == 'on'){
		      			audObjs[osc+'_pmlfoGain'].connect(audObjs[osc+'_freqFlt'].frequency)
		      		}
			      	
		      	}
		      	
		      	
		      	// OSCILLATORS Amplitude Modulation LFO
		      	
		      	if (patch[osc+'_amlSwitch'] == 'on' && patch[osc+'_ampSwitch'] == 'on'){
		      	
		      		audObjs[osc+'_amlfoGain'] = context.createGain();
		      		trackGains.push(audObjs[osc+'_amlfoGain']);
		      		trackForStop[osc+'_amlfoGain'] = audObjs[osc+'_amlfoGain'];
		      		
		      		if (patch[osc+'_amlOptions'] == 'basic') {
		      		
		      			audObjs[osc+'_amlfoGain'].gain.value = patch[osc+'_amlAmount'];
		      		
		      		} else {
		      			      		
		      			if (patch[osc+'_amlEnvSwitch'] == 'on') {
		      				
		      				var amlfoGainTime = 0;
					      	audObjs[osc+'_amlfoGain'].gain.value = 0;
					      	audObjs[osc+'_amlfoGain'].gain.setValueAtTime(0, now);
					      	if (patch[osc+'_amlDelaySwitch'] == 'on') {
					      		amlfoGainTime = Number(patch[osc+'_amlDelay']);
					      		audObjs[osc+'_amlfoGain'].gain.setValueAtTime(0, now + amlfoGainTime);
					      	}
					      	if (patch[osc+'_amlAttackSwitch'] == 'on') {
					      		amlfoGainTime = amlfoGainTime + Number(patch[osc+'_amlAttack']);
					      	}
					      	audObjs[osc+'_amlfoGain'].gain.linearRampToValueAtTime(patch[osc+'_amlAmount'], now + amlfoGainTime);
					      	if (patch[osc+'_amlSustainSwitch'] == 'off' && patch[osc+'_amlReleaseSwitch'] == 'on') {
					      		amlfoGainTime = amlfoGainTime + Number(patch[osc+'_amlRelease']);
					      		audObjs[osc+'_amlfoGain'].gain.linearRampToValueAtTime(0, now + amlfoGainTime);
					      	}
					    } else {
					    	audObjs[osc+'_amlfoGain'].gain.value = patch[osc+'_amlAmount'];
					    }
				      	
				    }
		      	
		      		if (patch[osc+'_amlShape'] != 'rnd' || patch[osc+'_amlOptions'] == 'basic') {
	
				      	if(osc == 'osc1'){osc1_amlfoGain.connect(audObjs[osc+'_amlfoGain'])};
				      	if(osc == 'osc2'){osc2_amlfoGain.connect(audObjs[osc+'_amlfoGain'])};
				      	if(osc == 'osc3'){osc3_amlfoGain.connect(audObjs[osc+'_amlfoGain'])};
				      	
			      	} else {  
				      	
				      	// RANDOM LFO
				      	audObjs[osc+'_noiseAml'] = new LFORANDOM(patch[osc+'_amlFreq'], patch[osc+'_amlSlide']);
				      	audObjs[osc+'_noiseAml'].output.connect(audObjs[osc+'_amlfoGain']);
				      	trackForStop[osc+'_amlfoR'] = audObjs[osc+'_noiseAml'].noise;
				      	panicVoices.push(audObjs[osc+'_noiseAml'].noise);
				      	
			      	}
		      	
			      	audObjs[osc+'_amlfoGain'].connect(audObjs[osc+'_VCA2'].gain);
			      	
		      	}
		      
		      	// OSCILLATORS Amplitude Envelope
		      	
		      	if (patch[osc+'_ameSwitch'] == 'on' && patch[osc+'_ampSwitch'] == 'on'){
		      		var ameTimeCalc = 0;
		      		audObjs[osc+'_VCA3'].gain.value = 0;
		      		audObjs[osc+'_VCA3'].gain.setValueAtTime(0, now);
		      		if (patch[osc+'_ameDelaySwitch'] == 'on'){
		      			ameTimeCalc = patch[osc+'_ameDelay'];
		      			audObjs[osc+'_VCA3'].gain.setValueAtTime(0, now + ameTimeCalc);
		      		}
		      		if (patch[osc+'_ameAttackSwitch'] == 'on'){
		      			ameTimeCalc = ameTimeCalc + patch[osc+'_ameAttack'];
		      		}
		      		audObjs[osc+'_VCA3'].gain.linearRampToValueAtTime(patch[osc+'_Amp'] * .01, now + ameTimeCalc);
		      		
		      		if (patch[osc+'_ameReleaseSwitch'] == "on" && patch[osc+'_ameSustainSwitch'] == "off"){
		      			audObjs[osc+'_VCA3'].gain.linearRampToValueAtTime(0, now + ameTimeCalc + patch[osc+'_ameRelease']);
		      		}
		      	}
		      	
		      	// PAN
		    	
		    	if (patch[osc+'_panSwitch'] == 'on'){
				    
				    // SAFARI WAY
		    	
		    		audObjs[osc+'_VCA3'].disconnect();
		    		audObjs[osc+'panL'] = context.createGain();
		    		trackGains.push(audObjs[osc+'panL']);
		    		audObjs[osc+'panR'] = context.createGain();
		    		trackGains.push(audObjs[osc+'panR']);
		    		audObjs[osc+'panM'] = context.createChannelMerger(2);
		    		audObjs[osc+'panL'].gain.value = ( patch[osc+'_pan'] * -0.005 ) + 0.5;
					audObjs[osc+'panR'].gain.value = ( patch[osc+'_pan'] * 0.005 ) + 0.5;
					audObjs[osc+'_VCA3'].connect(audObjs[osc+'panL']);
					audObjs[osc+'_VCA3'].connect(audObjs[osc+'panR']);
					audObjs[osc+'panR'].connect(audObjs[osc+'panM'], 0, 1);
					audObjs[osc+'panL'].connect(audObjs[osc+'panM'], 0, 0);
					
					if (patch[osc+'_panAutoSwitch'] == 'on'){
						
						
					    audObjs[osc+'panAutoSplit'] = context.createChannelSplitter(2);
						audObjs[osc+'panAutoL'] = context.createGain();
						audObjs[osc+'panAutoR'] = context.createGain();
						audObjs[osc+'panAutoLgain'] = context.createGain();
						audObjs[osc+'panAutoRgain'] = context.createGain();
						audObjs[osc+'panAutoRinvert'] = context.createGain();
					    audObjs[osc+'panAutoRinvert'].gain.value = -1;
						audObjs[osc+'panAutoMerge'] = context.createChannelMerger(2);
						
						audObjs[osc+'panM'].connect(audObjs[osc+'panAutoSplit']);
						audObjs[osc+'panAutoSplit'].connect(audObjs[osc+'panAutoLgain'], 0);
						audObjs[osc+'panAutoLgain'].connect(audObjs[osc+'panAutoL'], 0);
					    audObjs[osc+'panAutoSplit'].connect(audObjs[osc+'panAutoRgain'], 1);
					    audObjs[osc+'panAutoRgain'].connect(audObjs[osc+'panAutoR'], 0);
					    
						audObjs[osc+'panAutoR'].connect(audObjs[osc+'panAutoMerge'], 0, 1);
						audObjs[osc+'panAutoL'].connect(audObjs[osc+'panAutoMerge'], 0, 0);
						
						if(osc == 'osc1'){
				    		osc1_panlfoGain.connect(audObjs[osc+'panAutoLgain'].gain);
				    		osc1_panlfoGain.connect(audObjs[osc+'panAutoRinvert']);
				    	};
				    	if(osc == 'osc2'){
				    		osc2_panlfoGain.connect(audObjs[osc+'panAutoLgain'].gain);
				    		osc2_panlfoGain.connect(audObjs[osc+'panAutoRinvert']);
				    	};
				    	if(osc == 'osc3'){
				    		osc3_panlfoGain.connect(audObjs[osc+'panAutoLgain'].gain);
				    		osc3_panlfoGain.connect(audObjs[osc+'panAutoRinvert']);
				    	};
						
						audObjs[osc+'panAutoRinvert'].connect(audObjs[osc+'panAutoRgain'].gain);
						
						audObjs[osc+'panAutoMerge'].connect(audObjs[osc+'_VCA4']);
			    		
					} else {
						audObjs[osc+'panM'].connect(audObjs[osc+'_VCA4']);
					}
		    		
		    		/*
			    		
			    	// CHROME WAY
		    		
		    		audObjs[osc+'pan'] = context.createStereoPanner();
		    		trackGains.push(audObjs[osc+'pan']);
		    		audObjs[osc+'pan'].pan.value = patch[osc+'_pan']*.01;
		    		audObjs[osc+'_VCA3'].connect(audObjs[osc+'pan']);
		    		
		    		if (patch[osc+'_panAutoSwitch'] == 'on'){
		    			audObjs[osc+'autoPan'] = context.createStereoPanner();
		    			
		    			if(osc == 'osc1'){osc1_panlfoGain.connect(audObjs[osc+'autoPan'].pan)};
				      	if(osc == 'osc2'){osc2_panlfoGain.connect(audObjs[osc+'autoPan'].pan)};
				      	if(osc == 'osc3'){osc3_panlfoGain.connect(audObjs[osc+'autoPan'].pan)};
				      	
		    			audObjs[osc+'pan'].connect(audObjs[osc+'autoPan']);
		    			audObjs[osc+'autoPan'].connect(audObjs[osc+'_VCA4']);
		    		} else {
		    			audObjs[osc+'pan'].connect(audObjs[osc+'_VCA4']);
		    		}
		    		*/
		    		
		    	} else {
		    		audObjs[osc+'_VCA3'].connect(audObjs[osc+'_VCA4']);
		    	}
    	
    	
		      	
		      	// CONVOLVER
		      	
		      	if (patch[osc+'_convolverSwitch'] == 'on'){
		      	
		      		audObjs[osc+'_VCA4'].disconnect();
		      		
		      		audObjs[osc+'_convolverL'] = context.createConvolver();
		      		trackGains.push(audObjs[osc+'_convolverL']);
		      		audObjs[osc+'_convolverL'].buffer = oscIR[osc+'_L'];
		      		
		      		audObjs[osc+'_convolverR'] = context.createConvolver();
		      		trackGains.push(audObjs[osc+'_convolverR']);
		      		audObjs[osc+'_convolverR'].buffer = oscIR[osc+'_R'];
		      		
		      		
		      		
		      		// osc1_convolverGain
		      		audObjs[osc+'_convolverGain'] = context.createGain();
		      		trackGains.push(audObjs[osc+'_convolverGain']);
		      		audObjs[osc+'_convolverGain'].gain.value = patch[osc+'_convolverGain'] * .01;
		      		
		      		audObjs[osc+'_convolverMix'] = context.createGain();
		      		trackGains.push(audObjs[osc+'_convolverMix']);
		      		audObjs[osc+'_convolverDirect'] = context.createGain();
		      		trackGains.push(audObjs[osc+'_convolverDirect']);
		      		
		      		audObjs[osc+'_VCA4'].connect(audObjs[osc+'_convolverDirect']);
		      		
					audObjs[osc+'_convolverMix'].gain.value = Math.cos((1.0 - (patch[osc+'_convolverMix'] *.01)) * 0.5*Math.PI);
	    			audObjs[osc+'_convolverDirect'].gain.value = Math.cos((patch[osc+'_convolverMix'] *.01) * 0.5*Math.PI)
		      				      		
		      		if (patch[osc+'_superSwitch'] == 'on'){
		      			audObjs[osc+'_convolverSplitter'] = context.createChannelSplitter(2);
		      			trackGains.push(audObjs[osc+'_convolverSplitter']);
			      		audObjs[osc+'_VCA4'].connect(audObjs[osc+'_convolverSplitter']);
			      		audObjs[osc+'_convolverSplitter'].connect(audObjs[osc+'_convolverL'], 0);
					    audObjs[osc+'_convolverSplitter'].connect(audObjs[osc+'_convolverR'], 1);
				    } else {
				    	audObjs[osc+'_VCA4'].connect(audObjs[osc+'_convolverL']);
				    	audObjs[osc+'_VCA4'].connect(audObjs[osc+'_convolverR']);
				    }
				    
				    audObjs[osc+'_convolverL'].connect(audObjs[osc+'_convolverGain']);
				    audObjs[osc+'_convolverR'].connect(audObjs[osc+'_convolverGain']);
				    audObjs[osc+'_convolverGain'].connect(audObjs[osc+'_convolverMix']);
		      		audObjs[osc+'_convolverMix'].connect(audObjs[osc+'_VCA5']);
		      		audObjs[osc+'_convolverDirect'].connect(audObjs[osc+'_VCA5']);
		      		
		      	} else {
		      		audObjs[osc+'_VCA4'].connect(audObjs[osc+'_VCA5']);
		      	}
		      	
		      	// EQ
		      	
		      	if (patch[osc+'_eqSwitch'] == 'on'){
		      	
		      		audObjs[osc+'_VCA5'].disconnect();
		      		
		      		// create eqs
		      		if (patch[osc+'_eqHCSwitch'] == 'on'){
		      			audObjs[osc+'_eqHC'] = context.createBiquadFilter();
		      			trackGains.push(audObjs[osc+'_eqHC']);
	    				audObjs[osc+'_eqHC'].type = "lowpass";
	    				audObjs[osc+'_eqHC'].frequency.value = patch[osc+'_eqHC'];
		      		}
		      		
		      		if (patch[osc+'_eqPSwitch'] == 'on'){
		      			audObjs[osc+'_eqP'] = context.createBiquadFilter();
		      			trackGains.push(audObjs[osc+'_eqP']);
	    				audObjs[osc+'_eqP'].type = "peaking";
	    				audObjs[osc+'_eqP'].frequency.value = patch[osc+'_eqPf'];
	    				audObjs[osc+'_eqP'].gain.value = patch[osc+'_eqPa'];
		      		}
		      		
		      		if (patch[osc+'_eqLCSwitch'] == 'on'){
		      			audObjs[osc+'_eqLC'] = context.createBiquadFilter();
		      			trackGains.push(audObjs[osc+'_eqLC']);
	    				audObjs[osc+'_eqLC'].type = "highpass";
	    				audObjs[osc+'_eqLC'].frequency.value = patch[osc+'_eqLC'];
		      		}
		      		

		      		// create connections
		      		if (patch[osc+'_eqHCSwitch'] == 'on'){
		      			audObjs[osc+'_VCA5'].connect(audObjs[osc+'_eqHC']);
		      			if (patch[osc+'_eqPSwitch'] == 'on'){
		      				audObjs[osc+'_eqHC'].connect(audObjs[osc+'_eqP']);
		      				if (patch[osc+'_eqLCSwitch'] == 'on'){
		      					audObjs[osc+'_eqP'].connect(audObjs[osc+'_eqLC']);
		      					audObjs[osc+'_eqLC'].connect(audObjs[osc+'_VCA6']);
		      				} else {
		      					audObjs[osc+'_eqP'].connect(audObjs[osc+'_VCA6']);
		      				}
		      			} else {
		      				if (patch[osc+'_eqLCSwitch'] == 'on'){
		      					audObjs[osc+'_eqHC'].connect(audObjs[osc+'_eqLC']);
		      					audObjs[osc+'_eqLC'].connect(audObjs[osc+'_VCA6']);
		      				} else {
		      					audObjs[osc+'_eqHC'].connect(audObjs[osc+'_VCA6']);
		      				}
		      			}
		      			
		      		} else {
		      		
		      			if (patch[osc+'_eqPSwitch'] == 'on'){
		      				audObjs[osc+'_VCA5'].connect(audObjs[osc+'_eqP']);
		      				if (patch[osc+'_eqLCSwitch'] == 'on'){
		      					audObjs[osc+'_eqP'].connect(audObjs[osc+'_eqLC']);
		      					audObjs[osc+'_eqLC'].connect(audObjs[osc+'_VCA6']);
		      				} else {
		      					audObjs[osc+'_eqP'].connect(audObjs[osc+'_VCA6']);
		      				}
		      			} else {
		      				if (patch[osc+'_eqLCSwitch'] == 'on'){
		      					audObjs[osc+'_VCA4'].connect(audObjs[osc+'_eqLC']);
		      					audObjs[osc+'_eqLC'].connect(audObjs[osc+'_VCA6']);
		      				} else {
		      					audObjs[osc+'_VCA5'].connect(audObjs[osc+'_VCA6']);
		      				}
		      			}
		      		}
		      	} else {
		      		audObjs[osc+'_VCA5'].connect(audObjs[osc+'_VCA6']);
		      	}
		      				
    		}
    		
    	}
    	
	
	// OSCILLATORS MIX
	osc_Mix = context.createGain();
	if(this.velocity){osc_Mix.gain.value = this.velocity};
	trackGains.push(osc_Mix);
	if (patch.osc1_switch == "on") {audObjs['osc1_VCA6'].connect(osc_Mix)};
	if (patch.osc2_switch == "on") {audObjs['osc2_VCA6'].connect(osc_Mix)};
	if (patch.osc3_switch == "on") {audObjs['osc3_VCA6'].connect(osc_Mix)};
		
		
	// FILTERS
	
	if(patch.flts_switch == 'on'){
	    
	    fltMtx_oscsToF1Gain = context.createGain();
	    trackGains.push(fltMtx_oscsToF1Gain);
	    osc_Mix.connect(fltMtx_oscsToF1Gain);
	    
	    fltMtx_oscsToF2Gain = context.createGain();
	    trackGains.push(fltMtx_oscsToF2Gain);
	    osc_Mix.connect(fltMtx_oscsToF2Gain);
	    
	    fltMtx_oscsToVEGain = context.createGain();
	    trackGains.push(fltMtx_oscsToVEGain);
	    osc_Mix.connect(fltMtx_oscsToVEGain);
	    
	    fltMtx_F1ToF2Gain = context.createGain();
	    trackGains.push(fltMtx_F1ToF2Gain);
	    
	    fltMtx_F1ToVEGain = context.createGain();
	    trackGains.push(fltMtx_F1ToVEGain);
	    
	    // fltMtx_F2ToF1Gain = context.createGain();
	    // trackGains.push(fltMtx_F2ToF1Gain);
	    
	    fltMtx_F2ToVEGain = context.createGain();
	    trackGains.push(fltMtx_F2ToVEGain);
	    
	    if(patch.fltMtx_switch == 'on'){
		    fltMtx_oscsToF1Gain.gain.value = patch.fltMtx_oscsToF1 * .01;
		    fltMtx_oscsToF2Gain.gain.value = patch.fltMtx_oscsToF2 * .01;
		    fltMtx_oscsToVEGain.gain.value = patch.fltMtx_oscsToVE * .01;
		    fltMtx_F1ToF2Gain.gain.value = patch.fltMtx_F1ToF2 * .01;
		    fltMtx_F1ToVEGain.gain.value = patch.fltMtx_F1ToVE * .01;
		    // fltMtx_F2ToF1Gain.gain.value = patch.fltMtx_F2ToF1 * .01;
		    fltMtx_F2ToVEGain.gain.value = patch.fltMtx_F2ToVE * .01;} 
		 else {
		    fltMtx_oscsToF1Gain.gain.value = 1;
		    fltMtx_oscsToF2Gain.gain.value = 0;
		    fltMtx_oscsToVEGain.gain.value = 0;
		    fltMtx_F1ToF2Gain.gain.value = 1;
		    fltMtx_F1ToVEGain.gain.value = 0;
		    // fltMtx_F2ToF1Gain.gain.value = 0;
		    fltMtx_F2ToVEGain.gain.value = 1;
	    }
	    
		// FILTER 1
		
		if(patch.flt1_switch == 'on'){
		
			// flt1followSwitch,  flt1follow,  frequencyOct
			
			if (patch.flt1followSwitch == 'on'){
				var flt1CutFreq = patch.flt1_cutoff + ((this.frequency - patch.flt1_cutoff) * (.01 * patch.flt1follow));
			} else {
				var flt1CutFreq = patch.flt1_cutoff;
			}
			
			flt1 = context.createBiquadFilter();
			trackForStop.flt1 = flt1;
			flt1.type = patch.flt1_type;
			flt1.frequency.value = flt1CutFreq;
			flt1.Q.value = patch.flt1_q;
			
			// Filter 1 cutoff envelope
			
			if(patch.flt1_eSwitch == 'on' ){
				var flt1eTimeCalc = 0;
				if (patch.flt1_eAttackSwitch == 'on'){
					flt1.frequency.value = patch.flt1_eInitial;
					flt1.frequency.setValueAtTime(flt1.frequency.value, now);
					flt1eTimeCalc = patch.flt1_eAttack;
					flt1.frequency.exponentialRampToValueAtTime(flt1CutFreq, now + flt1eTimeCalc);
				}
				if (patch.flt1_eReleaseSwitch == 'on'){
					if(patch.flt1_eSustainSwitch == 'off'){
						flt1.frequency.setValueAtTime(flt1CutFreq, now + flt1eTimeCalc);
						flt1.frequency.linearRampToValueAtTime(patch.flt1_eTerminal, now + flt1eTimeCalc + patch.flt1_eRelease);
					}
				}
			}
			
			fltMtx_oscsToF1Gain.connect(flt1);
			flt1.connect(fltMtx_F1ToF2Gain);
			flt1.connect(fltMtx_F1ToVEGain);
			
			  // Filter 1 Frequency Modulation LFO
			  
		      if(patch.flt1_lSwitch == 'on'){
		      
		      	flt1_pmlfoGain = context.createGain();
		      	trackForStop.flt1_pmlfoGain = flt1_pmlfoGain;
		      	trackGains.push(flt1_pmlfoGain);
		      			      	
		      	if (patch.flt1_lEnvSwitch == 'on' && patch.flt1_lOptions == 'extended'){
		      		var flt1lTimeCalc = 0;
			      	flt1_pmlfoGain.gain.value = 0;
			      	flt1_pmlfoGain.gain.setValueAtTime(0, now);
			      	if (patch.flt1_lDelaySwitch == 'on'){
			      		flt1lTimeCalc = Number(patch.flt1_lDelay);
			      		flt1_pmlfoGain.gain.setValueAtTime(0, now + flt1lTimeCalc);
			      	}
			      	if (patch.flt1_lAttackSwitch == 'on'){
		      			flt1lTimeCalc = flt1lTimeCalc + patch.flt1_lAttack;
		      		}
			      	flt1_pmlfoGain.gain.linearRampToValueAtTime(patch.flt1_lAmount, now + flt1lTimeCalc);
			      	if (patch.flt1_lReleaseSwitch == 'on' && patch.flt1_lSustainSwitch == "off"){
			      		flt1lTimeCalc = flt1lTimeCalc + patch.flt1_lRelease;
			      		flt1_pmlfoGain.gain.linearRampToValueAtTime(0, now + flt1lTimeCalc);
			      	}
		      	} else {
		      		flt1_pmlfoGain.gain.value = patch.flt1_lAmount;
		      	}
		      	
		      	if (patch.flt1_lShape != 'rnd' || patch.flt1_lOptions == 'basic') {

		      		flt1_pmlfoRev.connect(flt1_pmlfoGain);
		      		
		      	} else {
		      		
		      		// RANDOM LFO 
			    	var noiseFlt1_pmlfo = new LFORANDOM(patch.flt1_lFreq, patch.flt1_lSlide);
			    	noiseFlt1_pmlfo.output.connect(flt1_pmlfoGain);
			    	trackForStop.flt1_pmlfo = noiseFlt1_pmlfo.noise;
			      	panicVoices.push(noiseFlt1_pmlfo.noise);
		      	
		      	}
		      	
		      	flt1_pmlfoGain.connect(flt1.frequency);
		      	
		      }
			
		} else {
			fltMtx_oscsToF1Gain.connect(fltMtx_F1ToF2Gain);
			if(patch.fltMtx_switch == 'on'){
				fltMtx_oscsToF1Gain.connect(fltMtx_F1ToVEGain);
			}
		}
		
		
		// FILTER 2
		
		if(patch.flt2_switch == 'on'){
		
			if (patch.flt2followSwitch == 'on'){
				var flt2CutFreq = patch.flt2_cutoff + ((this.frequency - patch.flt2_cutoff) * (.01 * patch.flt2follow));
			} else {
				var flt2CutFreq = patch.flt2_cutoff;
			}
		
			flt2 = context.createBiquadFilter();
			trackForStop.flt2 = flt2;
			flt2.type = patch.flt2_type;
			flt2.frequency.value = flt2CutFreq;
			flt2.Q.value = patch.flt2_q;
			
			// Filter 2 cutoff envelope
			
			if(patch.flt2_eSwitch == 'on' ){
				var flt2eTimeCalc = 0;
				if (patch.flt2_eAttackSwitch == 'on'){
					flt2.frequency.value = patch.flt2_eInitial;
					flt2.frequency.setValueAtTime(flt2.frequency.value, now);
					flt2eTimeCalc = patch.flt2_eAttack;
					flt2.frequency.exponentialRampToValueAtTime(flt2CutFreq, now + flt2eTimeCalc);
				}
				if (patch.flt2_eReleaseSwitch == 'on'){
					if(patch.flt2_eSustainSwitch == 'off'){
						flt2.frequency.setValueAtTime(flt2CutFreq, now + flt2eTimeCalc);
						flt2.frequency.linearRampToValueAtTime(patch.flt2_eTerminal, now + flt2eTimeCalc + patch.flt2_eRelease);
					}
				}
			}
			
			fltMtx_F1ToF2Gain.connect(flt2);
			// fltMtx_F2ToF1Gain.connect(flt1); disabled because feedback breaks audio context
			fltMtx_oscsToF2Gain.connect(flt2);
			flt2.connect(fltMtx_F2ToVEGain);
			// flt2.connect(fltMtx_F2ToF1Gain);
			
			  // Filter 2 Frequency Modulation LFO
			  
		      if(patch.flt2_lSwitch == 'on'){
		      
		      	flt2_pmlfoGain = context.createGain();
		      	trackForStop.flt2_pmlfoGain = flt2_pmlfoGain;
		      	trackGains.push(flt2_pmlfoGain);
		      			      	
		      	if (patch.flt2_lEnvSwitch == 'on' && patch.flt2_lOptions == 'extended'){
		      		var flt2lTimeCalc = 0;
			      	flt2_pmlfoGain.gain.value = 0;
			      	flt2_pmlfoGain.gain.setValueAtTime(0, now);
			      	if (patch.flt2_lDelaySwitch == 'on'){
			      		flt2lTimeCalc = Number(patch.flt2_lDelay);
			      		flt2_pmlfoGain.gain.setValueAtTime(0, now + flt2lTimeCalc);
			      	}
			      	if (patch.flt2_lAttackSwitch == 'on'){
		      			flt2lTimeCalc = flt2lTimeCalc + patch.flt2_lAttack;
		      		}
			      	flt2_pmlfoGain.gain.linearRampToValueAtTime(patch.flt2_lAmount, now + flt2lTimeCalc);
			      	if (patch.flt2_lReleaseSwitch == 'on' && patch.flt2_lSustainSwitch == "off"){
			      		flt2lTimeCalc = flt2lTimeCalc + patch.flt2_lRelease;
			      		flt2_pmlfoGain.gain.linearRampToValueAtTime(0, now + flt2lTimeCalc);
			      	}
		      	} else {
		      		flt2_pmlfoGain.gain.value = patch.flt2_lAmount;
		      	}
		      	
		      	if (patch.flt2_lShape != 'rnd' || patch.flt2_lOptions == 'basic') {

		      		flt2_pmlfoRev.connect(flt2_pmlfoGain);
		      		
		      	} else {
		      		
		      		// RANDOM LFO 
			    	var noiseflt2_pmlfo = new LFORANDOM(patch.flt2_lFreq, patch.flt2_lSlide);
			    	noiseflt2_pmlfo.output.connect(flt2_pmlfoGain);
			    	trackForStop.flt2_pmlfo = noiseflt2_pmlfo.noise;
			      	panicVoices.push(noiseflt2_pmlfo.noise);
		      	
		      	}
		      	
		      	flt2_pmlfoGain.connect(flt2.frequency);
		      	
		      }
			
		} else {
			fltMtx_F1ToF2Gain.connect(fltMtx_F2ToVEGain);
			if(patch.fltMtx_switch == 'on'){
				fltMtx_oscsToF2Gain.connect(fltMtx_F2ToVEGain);
			}
		}
      
      } else {
      	fltMtx_oscsToVEGain = context.createGain();
      	trackGains.push(fltMtx_oscsToVEGain);
	    osc_Mix.connect(fltMtx_oscsToVEGain);
      }
			  
	  // Volume Envelope
	  
	  ampEnv = context.createGain();
	  trackGains.push(ampEnv);
      trackForStop.ampEnv = ampEnv;
      var ae_totalTime = 0;
      var ae_currentLevel = 1;
      trackForStop.releaseStart = now + ae_totalTime;
      
      if (patch.ae_switch == 'on'){
      	 
      	 if (patch.ae_attackSwitch == 'on'){
      	 
      	 	ae_currentLevel = 0;
      	 	ampEnv.gain.setValueAtTime(ae_currentLevel, now);
      	 	      	 	      	 
      	 	if (patch.ae_options == 'basic'){
      	 
	      	 	ae_currentLevel = 1;
	      	 	ae_totalTime += patch.ae_attackTime;
	      	 	ampEnv.gain.linearRampToValueAtTime(ae_currentLevel, now + ae_totalTime);
	      	 
	      	} else {
	      	
	      		if (patch.ae_attackPart1Switch == 'on'){
      			
      				ae_totalTime += patch.ae_attackPart1Time;
      				ae_currentLevel = patch.ae_attackPart1Level*.01;
      				ampEnv.gain.linearRampToValueAtTime(ae_currentLevel, now + ae_totalTime);
      				ae_currentLevel = patch.ae_attackPart1Level*.01;
      				
      			}
      			
      			if (patch.ae_attackPart2Switch == 'on'){
      			
      				ae_totalTime += patch.ae_attackPart2Time;
      				ae_currentLevel = patch.ae_attackPart2Level*.01;
      				ampEnv.gain.linearRampToValueAtTime(ae_currentLevel, now + ae_totalTime);
      				ae_currentLevel = patch.ae_attackPart2Level*.01;
      				
      			} else if (patch.ae_attackPart1Switch == 'off'){
      			
      				ampEnv.gain.value = 1;
      				ae_currentLevel = 1;
      				ampEnv.gain.setValueAtTime(ampEnv.gain.value, now);
      				
      			}
	      	
	      	}
      	 
      	 } else {
      	 
      	 	ampEnv.gain.value = 1;
      	 	ae_currentLevel = 1;
      		ampEnv.gain.setValueAtTime(ampEnv.gain.value, now);
      	 
      	 }
      	 
      	 if (patch.ae_decaySwitch == 'on' && patch.ae_attackSwitch == 'on'){
      	 
	  		ae_totalTime += patch.ae_decayTime;
	  		ae_currentLevel = patch.ae_decayLevel*.01;
	  		ampEnv.gain.linearRampToValueAtTime(ae_currentLevel, now + ae_totalTime);
	  		
	  	 }
	  	 
	  	 if (patch.ae_releaseSwitch == 'on'){
	  	 	if (patch.ae_options == 'basic'){
	  	 		
	  	 		if (patch.ae_sustainSwitch == 'off'){
	  	 			trackForStop.releaseStart = now + ae_totalTime;
		  	 		ae_totalTime += patch.ae_releaseTime;
		  	 		ampEnv.gain.linearRampToValueAtTime(0, now + ae_totalTime);
	  	 		}
	  	 	} else {
	  	 		if (patch.ae_sustainSwitch == 'off' || (patch.ae_sustainSwitch == 'on' && patch.ae_sustainMaxSwitch == 'on')){
	  	 			if (patch.ae_sustainSwitch == 'on' && patch.ae_sustainMaxSwitch == 'on'){
		      			ae_totalTime += patch.ae_sustainMaxTime;
		      			ampEnv.gain.linearRampToValueAtTime(ae_currentLevel, now + ae_totalTime);
		      		}
		      		
		      		if (patch.ae_holdSwitch == 'on'){
		      			ae_totalTime += patch.ae_holdTime;
		      			ampEnv.gain.linearRampToValueAtTime(ae_currentLevel, now + ae_totalTime);
		      		}
		      		
		      		trackForStop.releaseStart = now + ae_totalTime;
      		
		  	 		if (patch.ae_releasePart1Switch == 'on'){
	  				
	  					ae_totalTime += patch.ae_releasePart1Time;
	      				ampEnv.gain.linearRampToValueAtTime(patch.ae_releasePart1Level*.01, now + ae_totalTime);
	
	  				}
	  				
	  				if (patch.ae_releasePart2Switch == 'on'){
	  				
	  					ae_totalTime += patch.ae_releasePart2Time;
	      				ampEnv.gain.linearRampToValueAtTime(patch.ae_releasePart2Level*.01, now + ae_totalTime);
	
	  				}
	  				
	  				if (patch.ae_releasePart3Switch == 'on'){
	  				
	  					ae_totalTime += patch.ae_releasePart3Time;	
	  				}
	  				
	  				ampEnv.gain.linearRampToValueAtTime(0, now + ae_totalTime);
	  			}
	  	 	}
	  	 } else if (patch.ae_releaseSwitch == 'off'){
	  	 	ae_totalTime += .0001;
      		ampEnv.gain.linearRampToValueAtTime(0, now + ae_totalTime);
	  	 }
      	 
      }

      
      if (patch.flts_switch == 'on'){
      	fltMtx_F1ToVEGain.connect(ampEnv);
      	fltMtx_F2ToVEGain.connect(ampEnv);
      }
      
      fltMtx_oscsToVEGain.connect(ampEnv);
	  ampEnv.connect(effectsInput1);

      if (patch.osc1_switch == 'on'){
	      if (patch.osc1_noise == 'on' && patch.osc1_shapeSwitch == 'on'){
	      	audObjs['osc1_noise'].start(0);
	      	panicVoices.push(audObjs['osc1_noise']);
	      }else if (patch.osc1_superSwitch == 'on' && !(patch.osc1_wave == 'square' && patch.osc1_pulseSwitch == 'on')){
	      	var arrayLength = audObjs['osc1_SS'].length;
			for (var i = 0; i < arrayLength; i++) {
			    audObjs['osc1_SS'][i].start(0);
			    panicVoices.push(audObjs['osc1_SS'][i]);
			}
	      }else{
	      	audObjs['osc1_vco'].start(0);
	      	panicVoices.push(audObjs['osc1_vco']);
	      }
	  }
	  
	  if (patch.osc2_switch == 'on'){
		 if (patch.osc2_noise == 'on' && patch.osc2_shapeSwitch == 'on'){
	      	audObjs['osc2_noise'].start(0);
	      	panicVoices.push(audObjs['osc2_noise']);
	      }else if (patch.osc2_superSwitch == 'on' && !(patch.osc2_wave == 'square' && patch.osc2_pulseSwitch == 'on')){
	      	var arrayLength = audObjs['osc2_SS'].length;
			for (var i = 0; i < arrayLength; i++) {
			    audObjs['osc2_SS'][i].start(0);
			    panicVoices.push(audObjs['osc2_SS'][i]);
			}
	      }else{
	      	audObjs['osc2_vco'].start(0);
	      	panicVoices.push(audObjs['osc2_vco']);
	      }
	  }
	  
	  if (patch.osc3_switch == 'on'){
		  if (patch.osc3_noise == 'on' && patch.osc3_shapeSwitch == 'on'){
	      	audObjs['osc3_noise'].start(0);
	      	panicVoices.push(audObjs['osc3_noise']);
	      }else if (patch.osc3_superSwitch == 'on' && !(patch.osc3_wave == 'square' && patch.osc3_pulseSwitch == 'on')){
	      	var arrayLength = audObjs['osc3_SS'].length;
			for (var i = 0; i < arrayLength; i++) {
			    audObjs['osc3_SS'][i].start(0);
			    panicVoices.push(audObjs['osc3_SS'][i]);
			}
	      }else{
	      	audObjs['osc3_vco'].start(0);
	      	panicVoices.push(audObjs['osc3_vco']);
	      }
	  }
      
	
      // Keep track of the oscillators and gains for STOPPING
            
      trackForStop.trackGains = trackGains;
      this.oscillatorsNew.push(trackForStop);
      	
    };
    
    /* ========== */
    /* STOP SOUND */
    /* ========== */

    Voice.prototype.stop = function() {
    
      var now = context.currentTime;
            
      this.oscillatorsNew.forEach(function(oscillatorsNew, _) {
        	    
	    var ae_totalTime = 0;
	    
	    if (patch.ae_switch == 'on'){

	    	if (patch.ae_options == 'basic'){
	    		
	    		if (patch.ae_releaseSwitch == 'on'){
	    		
	    			if (patch.ae_sustainSwitch == 'on' || oscillatorsNew.releaseStart > now){
	    				oscillatorsNew.ampEnv.gain.cancelScheduledValues(now);
						oscillatorsNew.ampEnv.gain.setValueAtTime(oscillatorsNew.ampEnv.gain.value, now);
			    		oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(0, now + patch.ae_releaseTime);
			    		ae_totalTime = patch.ae_releaseTime;
			    	}
			    	
	    		} else {
	    		
	    			oscillatorsNew.ampEnv.gain.cancelScheduledValues(now);
					oscillatorsNew.ampEnv.gain.setValueAtTime(oscillatorsNew.ampEnv.gain.value, now);
	    			oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(0, now + .01);
	    			
	    		}
	    		
	    	} else {
	    	
	    		if (patch.ae_releaseSwitch == 'on'){
	    		
	    			if ((patch.ae_sustainSwitch == 'on' && patch.ae_sustainMaxSwitch == 'off') || oscillatorsNew.releaseStart > now){
	    			
	    				oscillatorsNew.ampEnv.gain.cancelScheduledValues(now);
						oscillatorsNew.ampEnv.gain.setValueAtTime(oscillatorsNew.ampEnv.gain.value, now);
	    			
		    			if (patch.ae_holdSwitch == 'on'){
					    
			      			ae_totalTime += patch.ae_holdTime;
			      			oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(oscillatorsNew.ampEnv.gain.value, now + ae_totalTime);
			      			
			      		}
			      		
			      		if (patch.ae_releasePart1Switch == 'on'){
		      				
	      					ae_totalTime += patch.ae_releasePart1Time;
		      				oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(patch.ae_releasePart1Level*.01, now + ae_totalTime);
	
	      				}
	      				
	      				if (patch.ae_releasePart2Switch == 'on'){
	      				
	      					ae_totalTime += patch.ae_releasePart2Time;
		      				oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(patch.ae_releasePart2Level*.01, now + ae_totalTime);
	
	      				}
	      				
	      				if (patch.ae_releasePart3Switch == 'on'){
	      				
	      					ae_totalTime += patch.ae_releasePart3Time;
		      				oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(0, now + ae_totalTime);
	
	      				}
	      				
	      				oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(0, now + ae_totalTime + .001);
	      			
	      			}
	      			
	      			else {ae_totalTime = ae_totalTime + patch.ae_holdTime + patch.ae_releaseTime + patch.ae_releasePart1Time + patch.ae_releasePart2Time + patch.ae_releasePart3Time}
	    			
	    		}
	    	}
	    	   		
		} else {
		
			// Amplitude Envelope Off closes gate
			oscillatorsNew.ampEnv.gain.cancelScheduledValues(now);
		    oscillatorsNew.ampEnv.gain.setValueAtTime(oscillatorsNew.ampEnv.gain.value, now);
		    oscillatorsNew.ampEnv.gain.linearRampToValueAtTime(0, now + .001);
		    
		}
		
		var oscStop = ae_totalTime + now + .2;
						
		if (oscillatorsNew.osc1_vco != undefined){
	    	oscillatorsNew.osc1_vco.stop(oscStop);
	    }
	    if (oscillatorsNew.osc1_noise != undefined){
	    	oscillatorsNew.osc1_noise.stop(oscStop);
	    }

	    if (oscillatorsNew.osc1_SS != undefined){
	    	var arrayLength = oscillatorsNew.osc1_SS.length;
			for (var i = 0; i < arrayLength; i++) {
		    	oscillatorsNew.osc1_SS[i].stop(oscStop);
			}
		}
	    
	    if (oscillatorsNew.osc2_vco != undefined){
	    	oscillatorsNew.osc2_vco.stop(oscStop);
	    }
	    if (oscillatorsNew.osc2_noise != undefined){
	    	oscillatorsNew.osc2_noise.stop(oscStop);
	    }

	    if (oscillatorsNew.osc2_SS != undefined){
	    	var arrayLength = oscillatorsNew.osc2_SS.length;
			for (var i = 0; i < arrayLength; i++) {
		    	oscillatorsNew.osc2_SS[i].stop(oscStop);
			}
		}
	    
	    if (oscillatorsNew.osc3_vco != undefined){
	    	oscillatorsNew.osc3_vco.stop(oscStop);
	    }
	    if (oscillatorsNew.osc3_noise != undefined){
	    	oscillatorsNew.osc3_noise.stop(oscStop);
	    }

	    if (oscillatorsNew.osc3_SS != undefined){
	    	var arrayLength = oscillatorsNew.osc3_SS.length;
			for (var i = 0; i < arrayLength; i++) {
		    	oscillatorsNew.osc3_SS[i].stop(oscStop);
			}
		}

	    
	    //
	    setTimeout(function(){
	    	oscillatorsNew.ampEnv.disconnect();
	    	for (var i = 0; i < oscillatorsNew.trackGains.length; i++) {
			    oscillatorsNew.trackGains[i].disconnect();
			}
	    },((ae_totalTime + .3) * 1000));
	    
	    for (var oscL=0; oscL<3; oscL++){
    	
    		var osc = 'osc' + (oscL+1);
	    
	   		if (patch[osc+'_switch'] == 'on' && 
				patch[osc+'_pmlSwitch'] == 'on' && 
				patch[osc+'_pmlOptions'] == 'extended' && 
				patch[osc+'_pmlEnvSwitch'] == 'on' && 
				patch[osc+'_pmlReleaseSwitch'] == 'on') {
				
					oscillatorsNew[osc+'_pmlfoGain'].gain.cancelScheduledValues(now);
					oscillatorsNew[osc+'_pmlfoGain'].gain.setValueAtTime(oscillatorsNew[osc+'_pmlfoGain'].gain.value, now);
					oscillatorsNew[osc+'_pmlfoGain'].gain.linearRampToValueAtTime(0, now + patch[osc+'_pmlRelease']);
				
			}
		    
			if (patch[osc+'_switch'] == 'on' && patch[osc+'_pmeSustainSwitch'] == 'on' && patch[osc+'_pmeSwitch'] == 'on' && patch[osc+'_pmeReleaseSwitch'] == "on"){
			
				var pitchShift = Math.pow(2, patch[osc+'_pitchFine'] * .01);
			    var frequencyOct = (oscillatorsNew.thisPitch * patch[osc+'_octave']) * pitchShift;
			    
			
				pmeT = Math.pow(2, patch[osc+'_pmeTerminal'] * .01);
				pmee = frequencyOct*pmeT;
				if (pmee < 15){pmee = 15};
				
				if (oscillatorsNew[osc+'_vco']){
					oscillatorsNew[osc+'_vco'].frequency.cancelScheduledValues(now);
					oscillatorsNew[osc+'_vco'].frequency.setValueAtTime(oscillatorsNew[osc+'_vco'].frequency.value, now);
					oscillatorsNew[osc+'_vco'].frequency.linearRampToValueAtTime(pmee, now + patch[osc+'_pmeRelease']);
				}
				
				if (oscillatorsNew[osc+'_SS'] != undefined){
					var superNumber = patch[osc+'_superNumber'];
					var valDif = patch[osc+'_superShift'] / (( superNumber - 1) / 2 );
					var valStart = 1 - patch[osc+'_superShift'];
					vcoSSVal = new Array();
					for (var i = 0; i < superNumber; i++) {
						vcoSSVal.push(valStart + (valDif * i));
					}
			    	var arrayLength = oscillatorsNew[osc+'_SS'].length;
					for (var i = 0; i < arrayLength; i++) {
				    	oscillatorsNew[osc+'_SS'][i].stop(oscStop);
				    	oscillatorsNew[osc+'_SS'][i].frequency.cancelScheduledValues(now);
						oscillatorsNew[osc+'_SS'][i].frequency.setValueAtTime(oscillatorsNew[osc+'_SS'][i].frequency.value, now);
						oscillatorsNew[osc+'_SS'][i].frequency.linearRampToValueAtTime(pmee * vcoSSVal[i], now + patch[osc+'_pmeRelease']);
					}
				}
				
				// trackForStop[osc+'_freqFlt'] = audObjs[osc+'_freqFlt'];
				
				if (oscillatorsNew[osc+'_freqFlt']){
					oscillatorsNew[osc+'_freqFlt'].frequency.cancelScheduledValues(now);
					oscillatorsNew[osc+'_freqFlt'].frequency.setValueAtTime(oscillatorsNew[osc+'_freqFlt'].frequency.value, now);
					oscillatorsNew[osc+'_freqFlt'].frequency.linearRampToValueAtTime(pmee, now + patch[osc+'_pmeRelease']);
				}
			}
			
			if (patch[osc+'_switch'] == 'on' && 
				patch[osc+'_amlSwitch'] == 'on' && 
				patch[osc+'_amlOptions'] == 'extended' && 
				patch[osc+'_amlEnvSwitch'] == 'on' && 
				patch[osc+'_amlReleaseSwitch'] == 'on') {
				
					oscillatorsNew[osc+'_amlfoGain'].gain.cancelScheduledValues(now);
					oscillatorsNew[osc+'_amlfoGain'].gain.setValueAtTime(oscillatorsNew[osc+'_amlfoGain'].gain.value, now);
					oscillatorsNew[osc+'_amlfoGain'].gain.linearRampToValueAtTime(0, now + patch[osc+'_amlRelease']);
				
			}
			
			if (patch[osc+'_switch'] == 'on' && patch[osc+'_ameSustainSwitch'] == 'on' && patch[osc+'_ameSwitch'] == 'on' && patch[osc+'_ameReleaseSwitch'] == 'on'){
				oscillatorsNew[osc+'_VCA3'].gain.cancelScheduledValues( now );
				oscillatorsNew[osc+'_VCA3'].gain.setValueAtTime(oscillatorsNew[osc+'_VCA3'].gain.value, now);
				oscillatorsNew[osc+'_VCA3'].gain.linearRampToValueAtTime(0, now + patch[osc+'_ameRelease']);
			}
			
			if (patch[osc+'_switch'] == 'on' && patch[osc+'_shapeSwitch'] == 'on' && patch[osc+'_wave'] == 'square' && patch[osc+'_pulseSwitch'] == 'on'
				&& patch[osc+'_pulselSwitch'] == 'on' && patch[osc+'_pulselOptions'] == 'extended' && patch[osc+'_pulselEnvSwitch'] == 'on'
				&& patch[osc+'_pulselReleaseSwitch'] == 'on'){
					
				oscillatorsNew[osc+'_pulselfoGain'].gain.cancelScheduledValues( now );
				oscillatorsNew[osc+'_pulselfoGain'].gain.setValueAtTime(oscillatorsNew[osc+'_pulselfoGain'].gain.value, now);
				oscillatorsNew[osc+'_pulselfoGain'].gain.linearRampToValueAtTime(0, now + patch[osc+'_pulselRelease']);
			}
			
		}
		
		if (patch.flts_switch == 'on' && 
			patch.flt1_switch == 'on' && 
			patch.flt1_lSwitch == 'on' && 
			patch.flt1_lEnvSwitch == 'on' && 
			patch.flt1_lReleaseSwitch == 'on' &&
			patch.flt1_lSustainSwitch == 'on'
		){
			oscillatorsNew.flt1_pmlfoGain.gain.cancelScheduledValues( now );
			oscillatorsNew.flt1_pmlfoGain.gain.setValueAtTime(oscillatorsNew.flt1_pmlfoGain.gain.value, now);
			oscillatorsNew.flt1_pmlfoGain.gain.linearRampToValueAtTime(0, now + patch.flt1_lRelease);
		}
		
		if (patch.flts_switch == 'on' && 
			patch.flt2_switch == 'on' && 
			patch.flt2_lSwitch == 'on' && 
			patch.flt2_lEnvSwitch == 'on' && 
			patch.flt2_lReleaseSwitch == 'on' &&
			patch.flt2_lSustainSwitch == 'on'
		){
			oscillatorsNew.flt2_pmlfoGain.gain.cancelScheduledValues( now );
			oscillatorsNew.flt2_pmlfoGain.gain.setValueAtTime(oscillatorsNew.flt2_pmlfoGain.gain.value, now);
			oscillatorsNew.flt2_pmlfoGain.gain.linearRampToValueAtTime(0, now + patch.flt2_lRelease);
		}
		
		if (oscillatorsNew.flt1 && patch.flt1_eSwitch == 'on' && patch.flt1_eReleaseSwitch == 'on' && patch.flt1_eSustainSwitch == 'on'){
			oscillatorsNew.flt1.frequency.cancelScheduledValues( now );
			oscillatorsNew.flt1.frequency.setValueAtTime(oscillatorsNew.flt1.frequency.value, now);
			oscillatorsNew.flt1.frequency.linearRampToValueAtTime(patch.flt1_eTerminal, now + patch.flt1_eRelease);
		}
		
		if (oscillatorsNew.flt2 && patch.flt2_eSwitch == 'on' && patch.flt2_eSustainSwitch == 'on'){
			oscillatorsNew.flt2.frequency.cancelScheduledValues( now );
			oscillatorsNew.flt2.frequency.setValueAtTime(oscillatorsNew.flt2.frequency.value, now);
			oscillatorsNew.flt2.frequency.linearRampToValueAtTime(patch.flt2_eTerminal, now + patch.flt2_eRelease);
		}
		
      });
      
    }; 

    return Voice;
  })(context);
  
  active_voices = {};
  
  	var isMouseDown = false
		
	$( "#buttonContainer" ).on( "touchstart mousedown", ".tchKey", function(e) {
		e.stopPropagation(); e.preventDefault();
		isMouseDown = true;
		$(this).addClass("depressed");
		keyNum = $(this).index();
		wsPitch = patch.trig_p[keyNum];
		var voice = new Voice(wsPitch);
	    active_voices[keyNum] = voice;
	    voice.start(); 
	});
	
	$( "#buttonContainer" ).on( "mouseenter", ".tchKey", function(e) {
		if(isMouseDown){
			$(this).addClass("depressed");
			keyNum = $(this).index();
			wsPitch = patch.trig_p[keyNum];
			var voice = new Voice(wsPitch);
		    active_voices[keyNum] = voice;
		    voice.start();
	    }
	});
	
	$( "#ios9fix" ).on( "touchend mousedown", "#ios9touch", function(e) {
		e.stopPropagation(); e.preventDefault();
		keyNum = 1;
		wsPitch = patch.trig_p[keyNum];
		var voice = new Voice(wsPitch);
	    active_voices[keyNum] = voice;
	    voice.start();
	    active_voices[keyNum].stop();
	    delete active_voices[keyNum];
	    $("#ios9fix").hide();
	});

	$( "#buttonContainer" ).on( "touchend mouseup", ".tchKey", function(e) {
		e.stopPropagation(); e.preventDefault();
		isMouseDown = false;
		$(this).removeClass("depressed");
		keyNum = $(this).index();
		if (typeof active_voices[keyNum] != "undefined") {
			active_voices[keyNum].stop(); 
			delete active_voices[keyNum];
	    }
	});	
	
	$("body").mouseup(function() {
		isMouseDown = false;
	});	
	
	$( "#buttonContainer" ).on( "mouseleave", ".tchKey", function(e) {
		e.stopPropagation(); e.preventDefault();
		$(this).removeClass("depressed");
		keyNum = $(this).index();
		if (typeof active_voices[keyNum] != "undefined") {
			active_voices[keyNum].stop(); 
			delete active_voices[keyNum];
	    }
	});	
	
	// QWERTY KEYBOARD LISTENERS
	
	window.addEventListener('keydown', function (key) {
		if(!key.metaKey){
			if(!$('#patchName').is(":focus") && !$('#bpm').is(":focus") && !$('.data').is(":focus") && !$('#pitchManualContainer input').is(":focus")){
				var a = keyboardInputNum.indexOf(key.which);
				if (keyboardInputDown[a] == "off" && a < patch.trig_pads && a != -1){
					key.stopPropagation(); key.preventDefault();
					keyboardInputDown[a] = "on";
					$("#buttonContainer").children().eq(a).addClass("depressed");
					wsPitch = patch.trig_p[a];
					var voice = new Voice(wsPitch);
					active_voices[a] = voice;
					voice.start();
				}
				if (key.which == 39) {$("#patchNext").trigger('click')}
				if (key.which == 37) {$("#patchPrev").trigger('click')}
			}
		}
	});
	
	window.addEventListener('keyup', function (key) {
		var a = keyboardInputNum.indexOf(key.which);
		keyboardInputDown[a] = "off";
		$("#buttonContainer").children().eq(a).removeClass("depressed");
		if (typeof active_voices[a] != "undefined") {
			active_voices[a].stop(); 
			delete active_voices[a];
    	}
	});

	
});




// patchFix takes patches and makes sure they aren't corrupt and are using all the latest variables

function patchFix(e) {
		
	if (e.ve_switch == 'on'){
	
		// need to add fixes from 10 to 35 (first save: 8-21-14)
		
		// Pre 35 to 36 (patch fix introduced in 32, dated 3-9-15)
		
		e.ae_switch = 'on'; 
		e.ae_attackSwitch = 'on';
		e.ae_attackType = 'complex';
		e.ae_attackTime = e.ve_R1_time + e.ve_R2_time;
		e.ae_attackPart1Switch = 'on';
		e.ae_attackPart1TimeBPM = 'off';
		e.ae_attackPart1Time = e.ve_R1_time;
		e.ae_attackPart1Level = e.ve_R1_level;
		e.ae_attackPart2Switch = 'on';
		e.ae_attackPart2TimeBPM = 'off';
		e.ae_attackPart2Time = e.ve_R2_time;
		e.ae_attackPart2Level = e.ve_R2_level;
		e.ae_decaySwitch = 'on';
		e.ae_decayTimeBPM = 'off';
		e.ae_decayTime = e.ve_R3_time;
		e.ae_decayLevel = e.ve_R3_level;
		e.ae_sustainSwitch = e.ve_SustainSwitch;
		e.ae_sustainMaxSwitch = 'off';
		e.ae_sustainTimeBPM = 'off';
		e.ae_sustainMaxTime = 2;
		e.ae_holdSwitch = 'on';
		e.ae_holdTimeBPM = 'off';
		e.ae_holdTime = e.ve_SH;
		e.ae_releaseSwitch = 'on';
		e.ae_releaseType = 'complex';
		e.ae_releaseTime = e.ve_R4_time + e.ve_R5_time + e.ve_R6_time;
		e.ae_releasePart1Switch = 'on';
		e.ae_releasePart1TimeBPM = 'off';
		e.ae_releasePart1Time = e.ve_R4_time;
		e.ae_releasePart1Level = e.ve_R4_level;
		e.ae_releasePart2Switch = 'on';
		e.ae_releasePart2TimeBPM = 'off';
		e.ae_releasePart2Time = e.ve_R5_time;
		e.ae_releasePart2Level = e.ve_R5_level;
		e.ae_releasePart3Switch = 'on';
		e.ae_releasePart3TimeBPM = 'off';
		e.ae_releasePart3Time = e.ve_R6_time;
		
        delete e.ve_switch;
		delete e.ve_type;
	    delete e.ve_R1_time;
	    delete e.ve_R1_level;
	    delete e.ve_R2_time;
	    delete e.ve_R2_level;
	    delete e.ve_R3_time;
	    delete e.ve_R3_level;
	    delete e.ve_SustainSwitch;
	    delete e.ve_SH;
	    delete e.ve_R4_time;
	    delete e.ve_R4_level;
	    delete e.ve_R5_time;
	    delete e.ve_R5_level;
	    delete e.ve_R6_time;
		
	}
		
	if (!e.osc1_pmlOptions){
		if (e.osc1_pmlSwitch == 'off'){
			e.osc1_pmlOptions = 'basic';
		} else {
			e.osc1_pmlOptions = 'extended';
		}
		e.osc1_pmlSlide = 0;
		e.osc1_pmlAttack = 0;
		e.osc1_pmlRelease = 0;
		e.osc1_pmlDelayBPM = "off";
		e.osc1_pmlAttackBPM = "off";
		e.osc1_pmlReleaseBPM = "off";
		if (e.osc1_pmlAttack == 0 && e.osc1_pmlDelay == 0){
			e.osc1_pmlEnvSwitch = 'off';
			e.osc1_pmlAttackSwitch = 'off';
			e.osc1_pmlDelaySwitch = 'off';
		} else {
			e.osc1_pmlEnvSwitch = 'on';
			e.osc1_pmlAttackSwitch = 'on';
			e.osc1_pmlDelaySwitch = 'on';
		}
		e.osc1_pmlSustainSwitch = 'on';
		e.osc1_pmlReleaseSwitch = 'off';
	}
	
	if (!e.osc2_pmlOptions){
		if (e.osc2_pmlSwitch == 'off'){
			e.osc2_pmlOptions = 'basic';
		} else {
			e.osc2_pmlOptions = 'extended';
		}
		e.osc2_pmlSlide = 0;
		e.osc2_pmlAttack = 0;
		e.osc2_pmlRelease = 0;
		e.osc2_pmlDelayBPM = "off";
		e.osc2_pmlAttackBPM = "off";
		e.osc2_pmlReleaseBPM = "off";
		if (e.osc2_pmlAttack == 0 && e.osc2_pmlDelay == 0){
			e.osc2_pmlEnvSwitch = 'off';
			e.osc2_pmlAttackSwitch = 'off';
			e.osc2_pmlDelaySwitch = 'off';
		} else {
			e.osc2_pmlEnvSwitch = 'on';
			e.osc2_pmlAttackSwitch = 'on';
			e.osc2_pmlDelaySwitch = 'on';
		}
		e.osc2_pmlSustainSwitch = 'on';
		e.osc2_pmlReleaseSwitch = 'off';
	}
	
	if (!e.osc1_pmeDelaySwitch){
		if (e.osc1_pmeDelay == 0) {e.osc1_pmeDelaySwitch = 'off'} else {e.osc1_pmeDelaySwitch = 'on'}
		if (e.osc1_pmeAttack == 0) {e.osc1_pmeAttackSwitch = 'off'} else {e.osc1_pmeAttackSwitch = 'on'}
		if (!e.osc1_pmeRelease) {e.osc1_pmeRelease = e.osc1_pmeDecay; delete e.osc1_pmeDecay}
		if (e.osc1_pmeRelease == 0 || e.osc1_pmeTerminal == 0) {e.osc1_pmeReleaseSwitch = 'off'} else {e.osc1_pmeReleaseSwitch = 'on'}
		e.osc1_pmeDelayBPM = "off";
		e.osc1_pmeAttackBPM = "off";
		e.osc1_pmeReleaseBPM = "off";
	}
	
	if (!e.osc2_pmeDelaySwitch){
		if (e.osc2_pmeDelay == 0) {e.osc2_pmeDelaySwitch = 'off'} else {e.osc2_pmeDelaySwitch = 'on'}
		if (e.osc2_pmeAttack == 0) {e.osc2_pmeAttackSwitch = 'off'} else {e.osc2_pmeAttackSwitch = 'on'}
		if (!e.osc2_pmeRelease) {e.osc2_pmeRelease = e.osc2_pmeDecay; delete e.osc2_pmeDecay}
		if (e.osc2_pmeRelease == 0 || e.osc2_pmeTerminal == 0) {e.osc2_pmeReleaseSwitch = 'off'} else {e.osc2_pmeReleaseSwitch = 'on'}
		e.osc2_pmeDelayBPM = "off";
		e.osc2_pmeAttackBPM = "off";
		e.osc2_pmeReleaseBPM = "off";
	}
	
	if (!e.osc1_amlOptions){
		if (e.osc1_amlSwitch == 'off'){
			e.osc1_amlOptions = 'basic';
		} else {
			e.osc1_amlOptions = 'extended';
		}
		e.osc1_amlSlide = 0;
		e.osc1_amlAttack = .01;
		e.osc1_amlRelease = .01;
		e.osc1_amlDelayBPM = "off";
		e.osc1_amlAttackBPM = "off";
		e.osc1_amlReleaseBPM = "off";
		if (e.osc1_amlDelay == 0){
			e.osc1_amlEnvSwitch = 'off';
			e.osc1_amlDelaySwitch = 'off';
			e.osc1_amlDelay = .01;
		} else {
			e.osc1_amlEnvSwitch = 'on';
			e.osc1_amlDelaySwitch = 'on';
		}
		e.osc1_amlAttackSwitch = 'off';
		e.osc1_amlSustainSwitch = 'on';
		e.osc1_amlReleaseSwitch = 'off';
	}
	
	if (!e.osc2_amlOptions){
		if (e.osc2_amlSwitch == 'off'){
			e.osc2_amlOptions = 'basic';
		} else {
			e.osc2_amlOptions = 'extended';
		}
		e.osc2_amlSlide = 0;
		e.osc2_amlAttack = .01;
		e.osc2_amlRelease = .01;
		e.osc2_amlDelayBPM = "off";
		e.osc2_amlAttackBPM = "off";
		e.osc2_amlReleaseBPM = "off";
		if (e.osc2_amlDelay == 0){
			e.osc2_amlEnvSwitch = 'off';
			e.osc2_amlDelaySwitch = 'off';
			e.osc2_amlDelay = .01;
		} else {
			e.osc2_amlEnvSwitch = 'on';
			e.osc2_amlDelaySwitch = 'on';
		}
		e.osc2_amlAttackSwitch = 'off';
		e.osc2_amlSustainSwitch = 'on';
		e.osc2_amlReleaseSwitch = 'off';
	}
	
	if (!e.osc1_ameDelaySwitch){
		e.osc1_ameDelay = 0;
		e.osc1_ameDelaySwitch = 'off';
		if (e.osc1_ameAttack == 0) {e.osc1_ameAttackSwitch = 'off'} else {e.osc1_ameAttackSwitch = 'on'}
		if (!e.osc1_ameRelease) {e.osc1_ameRelease = e.osc1_ameDecay; delete e.osc1_ameDecay}
		if (e.osc1_ameRelease == 0) {e.osc1_ameReleaseSwitch = 'off'} else {e.osc1_ameReleaseSwitch = 'on'}
		e.osc1_ameDelayBPM = "off";
		e.osc1_ameAttackBPM = "off";
		e.osc1_ameReleaseBPM = "off";
	}
	
	if (!e.osc2_ameDelaySwitch){
		e.osc2_ameDelay = 0;
		e.osc2_ameDelaySwitch = 'off';
		if (e.osc2_ameAttack == 0) {e.osc2_ameAttackSwitch = 'off'} else {e.osc2_ameAttackSwitch = 'on'}
		if (!e.osc2_ameRelease) {e.osc2_ameRelease = e.osc2_ameDecay; delete e.osc2_ameDecay}
		if (e.osc2_ameRelease == 0) {e.osc2_ameReleaseSwitch = 'off'} else {e.osc2_ameReleaseSwitch = 'on'}
		e.osc2_ameDelayBPM = "off";
		e.osc2_ameAttackBPM = "off";
		e.osc2_ameReleaseBPM = "off";
	}
	
	
	if (!e.flt1_lOptions){ 
		e.flt1_lOptions = 'extended'; 
		e.flt1_lSlide = 0;
		
		if(e.flt1_lDelay > 0){
			e.flt1_lEnvSwitch = 'on';
			e.flt1_lDelaySwitch = 'on';
		} else {
			e.flt1_lEnvSwitch = 'off';
			e.flt1_lDelaySwitch = 'off';
		}
		e.flt1_lAttackSwitch = 'off';
		e.flt1_lAttack = .01;
		e.flt1_lReleaseSwitch = 'off';
		e.flt1_lRelease = .01;
		e.flt1_lSustainSwitch = 'on';
		e.flt1_lDelayBPM = 'off';
		e.flt1_lAttackBPM = 'off';
		e.flt1_lReleaseBPM = 'off';
		e.flt1_eAttackSwitch = 'on';
		e.flt1_eReleaseSwitch = 'on';
		e.flt1_eAttackBPM = 'off';
		e.flt1_eReleaseBPM = 'off';
		
		e.flt1_lDelay = e.flt1_pmlDelay;
		delete e.flt1_pmlDelay;
		e.flt1_eRelease = e.flt1_ceR;
		delete e.flt1_ceR;
		e.flt1_lSwitch = e.flt1_pmlSwitch;
		delete e.flt1_pmlSwitch;
		e.flt1_lShape = e.flt1_pmlShape;
		delete e.flt1_pmlShape;
		e.flt1_lBPM = e.flt1_pmlBPM;
		delete e.flt1_pmlBPM;
		e.flt1_lFreq = e.flt1_pmlFreq;
		delete e.flt1_pmlFreq;
		e.flt1_lAmount = e.flt1_pmlAmount;
		delete e.flt1_pmlAmount;
		e.flt1_eSwitch = e.flt1_ceSwitch;
		delete e.flt1_ceSwitch;
		e.flt1_eInitial = e.flt1_ceIC;
		delete e.flt1_ceIC;
		e.flt1_eAttack = e.flt1_ceA;
		delete e.flt1_ceA;
		e.flt1_eSustainSwitch = e.flt1_ceSustainSwitch;
		delete e.flt1_ceSustainSwitch;
		e.flt1_eTerminal = e.flt1_ceEC;
		delete e.flt1_ceEC;
	}
	
	if (!e.flt2_lOptions){ 
		e.flt2_lOptions = 'extended'; 
		e.flt2_lSlide = 0;
		
		if(e.flt2_lDelay > 0){
			e.flt2_lEnvSwitch = 'on';
			e.flt2_lDelaySwitch = 'on';
		} else {
			e.flt2_lEnvSwitch = 'off';
			e.flt2_lDelaySwitch = 'off';
		}
		e.flt2_lAttackSwitch = 'off';
		e.flt2_lAttack = .01;
		e.flt2_lReleaseSwitch = 'off';
		e.flt2_lRelease = .01;
		e.flt2_lSustainSwitch = 'on';
		e.flt2_lDelayBPM = 'off';
		e.flt2_lAttackBPM = 'off';
		e.flt2_lReleaseBPM = 'off';
		e.flt2_eAttackSwitch = 'on';
		e.flt2_eReleaseSwitch = 'on';
		e.flt2_eAttackBPM = 'off';
		e.flt2_eReleaseBPM = 'off';
		
		e.flt2_lDelay = e.flt2_pmlDelay;
		delete e.flt2_pmlDelay;
		e.flt2_eRelease = e.flt2_ceR;
		delete e.flt2_ceR;
		e.flt2_lSwitch = e.flt2_pmlSwitch;
		delete e.flt2_pmlSwitch;
		e.flt2_lShape = e.flt2_pmlShape;
		delete e.flt2_pmlShape;
		e.flt2_lBPM = e.flt2_pmlBPM;
		delete e.flt2_pmlBPM;
		e.flt2_lFreq = e.flt2_pmlFreq;
		delete e.flt2_pmlFreq;
		e.flt2_lAmount = e.flt2_pmlAmount;
		delete e.flt2_pmlAmount;
		e.flt2_eSwitch = e.flt2_ceSwitch;
		delete e.flt2_ceSwitch;
		e.flt2_eInitial = e.flt2_ceIC;
		delete e.flt2_ceIC;
		e.flt2_eAttack = e.flt2_ceA;
		delete e.flt2_ceA;
		e.flt2_eSustainSwitch = e.flt2_ceSustainSwitch;
		delete e.flt2_ceSustainSwitch;
		e.flt2_eTerminal = e.flt2_ceEC;
		delete e.flt2_ceEC;
	}
	
	if (!e.ae_options){
		e.ae_options = "extended";
		e.ae_attackTimeBPM = "off";
		e.ae_releaseTimeBPM = "off"; 
		
		if(e.ae_attackType == 'simple'){
			if(e.ae_attackSwitch == 'on'){
				e.ae_attackPart1Switch = 'on'
			} else {e.ae_attackPart1Switch = 'off'}
			e.ae_attackPart1TimeBPM = 'off';
			e.ae_attackPart1Time = e.ae_attackTime;
			e.ae_attackPart1Level = 100;
			e.ae_attackPart2Switch = "off";
		}

		e.ae_attackSwitch = "on";
		if(e.ae_releaseType == 'simple'){
			e.ae_releasePart1Switch = "off";
			e.ae_releasePart2Switch = "off";
			e.ae_releasePart3Switch = "on";
			e.ae_releasePart1TimeBPM = 'off';
			e.ae_releasePart3Time = e.ae_releaseTime;
		}
	}
	
	if (!e.tremolo_rateBPM){ e.tremolo_rateBPM = "off" }
	
	// 38
	
	if (!e.osc1_shapeSwitch){
		// osc1_shapeSwitch  osc1_freqSwitch  osc1_ampSwitch
		if (e.osc1_wave == "sine"){e.osc1_shapeSwitch = 'off'} else {e.osc1_shapeSwitch = 'on'};
		if (e.osc1_pitchFine == 0 && e.osc1_octave == 1 && e.osc1_pmlSwitch == 'off' && e.osc1_pmeSwitch == 'off'){e.osc1_freqSwitch = "off"} else {e.osc1_freqSwitch = "on"};
		if (e.osc1_Amp == 100 && e.osc1_octave == 1 && e.osc1_amlSwitch == 'off' && e.osc1_ameSwitch == 'off'){e.osc1_ampSwitch = "off"} else {e.osc1_ampSwitch = "on"};
		if (e.osc2_wave == "sine"){e.osc2_shapeSwitch = 'off'} else {e.osc2_shapeSwitch = 'on'};
		if (e.osc2_pitchFine == 0 && e.osc2_octave == 1 && e.osc2_pmlSwitch == 'off' && e.osc2_pmeSwitch == 'off'){e.osc2_freqSwitch = "off"} else {e.osc2_freqSwitch = "on"};
		if (e.osc2_Amp == 100 && e.osc2_octave == 1 && e.osc2_amlSwitch == 'off' && e.osc2_ameSwitch == 'off'){e.osc2_ampSwitch = "off"} else {e.osc2_ampSwitch = "on"};;
	}
	
	// 39
	
	// osc1_freqFltSwitch, osc1_freqFltType, osc1_freqFltQ, osc1_freqFltMix
	
	if (!e.osc1_freqFltSwitch){
		if(e.osc1_shapeSwitch == 'on' && e.osc1_noise == 'on' && e.osc1_noiseFilt != 'off'){
			e.osc1_freqFltSwitch = 'on';
			e.osc1_freqFltType = e.osc1_noiseFilt;
			e.osc1_freqFltQ = e.osc1_noiseQ;
			e.osc1_freqFltMix = 100;
		} else {
			e.osc1_freqFltSwitch = 'off';
			e.osc1_freqFltType = 'bandpass';
			e.osc1_freqFltQ = .5;
			e.osc1_freqFltMix = 100;
		}
		
		if(e.osc2_shapeSwitch == 'on' && e.osc2_noise == 'on' && e.osc2_noiseFilt != 'off'){
			e.osc2_freqFltSwitch = 'on';
			e.osc2_freqFltType = e.osc2_noiseFilt;
			e.osc2_freqFltQ = e.osc2_noiseQ;
			e.osc2_freqFltMix = 100;
		} else {
			e.osc2_freqFltSwitch = 'off';
			e.osc2_freqFltType = 'bandpass';
			e.osc2_freqFltQ = .5;
			e.osc2_freqFltMix = 100;
		}
		
		delete e.osc1_noiseFilt;
		delete e.osc1_noiseQ;
		delete e.osc2_noiseFilt;
		delete e.osc2_noiseQ;
		
	}
	
	// 40
	
	if (!e.bpm_switch){
		e.bpm_switch = "on"
	}
	
	// 41
		
	if (!e.osc3_switch){
		e.osc3_switch = "off";
		e.osc3_wave = "sine";
		e.osc3_noise = "off";
		e.osc3_octave = 1;
		e.osc3_pitchFine = 0;
		e.osc3_pmeSwitch = "off";
		e.osc3_pmeInitial = 0;
		e.osc3_pmeDelay = 0;
		e.osc3_pmeAttack = 0.2;
		e.osc3_pmeSustainSwitch = "on";
		e.osc3_pmeTerminal = 0;
		e.osc3_pmlSwitch = "off";
		e.osc3_pmlShape = "sine";
		e.osc3_pmlFreq = 7;
		e.osc3_pmlFreqAttack = 1;
		e.osc3_pmlAmount = 15;
		e.osc3_pmlDelay = 0;
		e.osc3_Amp = 100;
		e.osc3_ameSwitch = "off";
		e.osc3_ameAttack = 0.5;
		e.osc3_ameSustainSwitch = "on";
		e.osc3_amlSwitch = "off";
		e.osc3_amlShape = "sine";
		e.osc3_amlFreq = 7;
		e.osc3_amlAmount = 0.5;
		e.osc3_amlDelay = 0.01;
		e.osc3_pmlBPM = "off";
		e.osc3_amlBPM = "off";
		e.osc3_pmlOptions = "basic";
		e.osc3_pmlSlide = "0";
		e.osc3_pmlAttack = 0;
		e.osc3_pmlRelease = 0;
		e.osc3_pmlDelayBPM = "off";
		e.osc3_pmlAttackBPM = "off";
		e.osc3_pmlReleaseBPM = "off";
		e.osc3_pmlEnvSwitch = "off";
		e.osc3_pmlAttackSwitch = "off";
		e.osc3_pmlDelaySwitch = "off";
		e.osc3_pmlSustainSwitch = "on";
		e.osc3_pmlReleaseSwitch = "off";
		e.osc3_pmeDelaySwitch = "off";
		e.osc3_pmeAttackSwitch = "off";
		e.osc3_pmeRelease = 1;
		e.osc3_pmeReleaseSwitch = "off";
		e.osc3_pmeDelayBPM = "off";
		e.osc3_pmeAttackBPM = "off";
		e.osc3_pmeReleaseBPM = "off";
		e.osc3_amlOptions = "basic";
		e.osc3_amlSlide = 0;
		e.osc3_amlAttack = 0.01;
		e.osc3_amlRelease = 0.01;
		e.osc3_amlDelayBPM = "off";
		e.osc3_amlAttackBPM = "off";
		e.osc3_amlReleaseBPM = "off";
		e.osc3_amlEnvSwitch = "off";
		e.osc3_amlDelaySwitch = "off";
		e.osc3_amlAttackSwitch = "off";
		e.osc3_amlSustainSwitch = "on";
		e.osc3_amlReleaseSwitch = "off";
		e.osc3_ameDelay = 0.5;
		e.osc3_ameDelaySwitch = "off";
		e.osc3_ameAttackSwitch = "off";
		e.osc3_ameRelease = 0.5;
		e.osc3_ameReleaseSwitch = "off";
		e.osc3_ameDelayBPM = "off";
		e.osc3_ameAttackBPM = "off";
		e.osc3_ameReleaseBPM = "off";
		e.osc3_shapeSwitch = "off";
		e.osc3_freqSwitch = "off";
		e.osc3_ampSwitch = "off";
		e.osc3_freqFltType = "bandpass";
		e.osc3_freqFltQ = 0.5;
		e.osc3_freqFltMix = 100;
	}
	
	// 41
	
	if (!e.osc1_superSwitch){
		if (e.osc1_wave == "ss"){e.osc1_superSwitch = "on"; e.osc1_wave = "sawtooth"} else {e.osc1_superSwitch = "off"};
		if (e.osc2_wave == "ss"){e.osc2_superSwitch = "on"; e.osc2_wave = "sawtooth"} else {e.osc2_superSwitch = "off"};
		if (e.osc3_wave == "ss"){e.osc3_superSwitch = "on"; e.osc3_wave = "sawtooth"} else {e.osc3_superSwitch = "off"};
		e.osc1_superNumber = 5;
		e.osc1_superShift = .03;
		e.osc1_superWidth = 100;
		e.osc2_superNumber = 5;
		e.osc2_superShift = .03;
		e.osc2_superWidth = 100;
		e.osc3_superNumber = 5;
		e.osc3_superShift = .03;
		e.osc3_superWidth = 100;  
	}
		
	if (!e.eq_HCswitch){e.eq_HCswitch = 'off'; e.eq_HC = 10000; e.eq_LCswitch = 'off'; e.eq_LC = 10000}
	
	// 45 + 46 osc1_convolverSwitch  osc1_convolverType  osc1_convolverMix
	
	if (!e.osc1_convolverSwitch){
		e.osc1_convolverSwitch = "off";
		e.osc1_convolverType = "drm1_bassdrum_a";
		e.osc1_convolverMix = 50;
		
		e.osc2_convolverSwitch = "off";
		e.osc2_convolverType = "drm1_bassdrum_a";
		e.osc2_convolverMix = 50;
		
		e.osc3_convolverSwitch = "off";
		e.osc3_convolverType = "drm1_bassdrum_a";
		e.osc3_convolverMix = 50;
	}
	
	if (!e.osc1_convolverGain){
		e.osc1_convolverGain = 100;
		e.osc2_convolverGain = 100;
		e.osc3_convolverGain = 100;
	}
	
	if (!e.flt1followSwitch){
		e.flt1followSwitch = "off";
		e.flt1follow = 1;
		e.flt2followSwitch = "off";
		e.flt2follow = 1;
	}
	
	if (!e.reverbDelayBPM){
		e.reverbDelaySwitch = "off";
		e.reverbDelayBPM = "off";
		e.reverbDelay = .1;
	}
	
	if (!e.osc1_eqSwitch){
		e.osc1_eqSwitch = "off";
		e.osc1_eqHCSwitch = "off";
		e.osc1_eqHC = 10000;
		e.osc1_eqPSwitch = "off";
		e.osc1_eqPa = 0;
		e.osc1_eqPf = 1200;
		e.osc1_eqLCSwitch = "off";
		e.osc1_eqLC = 250;
		
		e.osc2_eqSwitch = "off";
		e.osc2_eqHCSwitch = "off";
		e.osc2_eqHC = 10000;
		e.osc2_eqPSwitch = "off";
		e.osc2_eqPa = 0;
		e.osc2_eqPf = 1200;
		e.osc2_eqLCSwitch = "off";
		e.osc2_eqLC = 250;
		
		e.osc3_eqSwitch = "off";
		e.osc3_eqHCSwitch = "off";
		e.osc3_eqHC = 10000;
		e.osc3_eqPSwitch = "off";
		e.osc3_eqPa = 0;
		e.osc3_eqPf = 1200;
		e.osc3_eqLCSwitch = "off";
		e.osc3_eqLC = 250;
	}
	
	if (!e.osc1_panSwitch){
		e.osc1_panSwitch = "off";
		e.osc1_pan = 0;
		e.osc1_panAutoSwitch = "off";
		e.osc1_panAutoRate = 1;
		e.osc1_panAutoDepth = 100;
		
		e.osc2_panSwitch = "off";
		e.osc2_pan = 0;
		e.osc2_panAutoSwitch = "off";
		e.osc2_panAutoRate = 1;
		e.osc2_panAutoDepth = 100;
		
		e.osc3_panSwitch = "off";
		e.osc3_pan = 0;
		e.osc3_panAutoSwitch = "off";
		e.osc3_panAutoRate = 1;
		e.osc3_panAutoDepth = 100;
	}
	
	// 47
	
	if (!e.osc1_pulseSwitch){
		e.osc1_pulseSwitch =  "off";
		e.osc1_pulseWidth = 0;
		e.osc1_pulselSwitch = "off";
		e.osc1_pulselOptions = "basic";
		e.osc1_pulselShape = "sine";
		e.osc1_pulselSlide = 0;
		e.osc1_pulselBPM = "off";
		e.osc1_pulselFreq = 7;
		e.osc1_pulselAmount = .5;
		e.osc1_pulselEnvSwitch = "off";
		e.osc1_pulselDelaySwitch = "off";
		e.osc1_pulselDelayBPM = "off";
		e.osc1_pulselDelay = 0;
		e.osc1_pulselAttackSwitch = "off";
		e.osc1_pulselAttackBPM = "off";
		e.osc1_pulselAttack = 0;
		e.osc1_pulselReleaseSwitch = "off";
		e.osc1_pulselSustainSwitch = "on";
		e.osc1_pulselReleaseBPM = "off";
		e.osc1_pulselRelease = 0;		
				
		e.osc2_pulseSwitch =  "off";
		e.osc2_pulseWidth = 0;
		e.osc2_pulselSwitch = "off";
		e.osc2_pulselOptions = "basic";
		e.osc2_pulselShape = "sine";
		e.osc2_pulselSlide = 0;
		e.osc2_pulselBPM = "off";
		e.osc2_pulselFreq = 7;
		e.osc2_pulselAmount = .5;
		e.osc2_pulselEnvSwitch = "off";
		e.osc2_pulselDelaySwitch = "off";
		e.osc2_pulselDelayBPM = "off";
		e.osc2_pulselDelay = 0;
		e.osc2_pulselAttackSwitch = "off";
		e.osc2_pulselAttackBPM = "off";
		e.osc2_pulselAttack = 0;
		e.osc2_pulselReleaseSwitch = "off";
		e.osc2_pulselSustainSwitch = "on";
		e.osc2_pulselReleaseBPM = "off";
		e.osc2_pulselRelease = 0;	
		
		e.osc3_pulseSwitch =  "off";
		e.osc3_pulseWidth = 0;
		e.osc3_pulselSwitch = "off";
		e.osc3_pulselOptions = "basic";
		e.osc3_pulselShape = "sine";
		e.osc3_pulselSlide = 0;
		e.osc3_pulselBPM = "off";
		e.osc3_pulselFreq = 7;
		e.osc3_pulselAmount = .5;
		e.osc3_pulselEnvSwitch = "off";
		e.osc3_pulselDelaySwitch = "off";
		e.osc3_pulselDelayBPM = "off";
		e.osc3_pulselDelay = 0;
		e.osc3_pulselAttackSwitch = "off";
		e.osc3_pulselAttackBPM = "off";
		e.osc3_pulselAttack = 0;
		e.osc3_pulselReleaseSwitch = "off";
		e.osc3_pulselSustainSwitch = "on";
		e.osc3_pulselReleaseBPM = "off";
		e.osc3_pulselRelease = 0;	
		
		
	}
	
	return e;
	
}

// 2018 GOOGLE REQUIRES AN ON-SWITCH
window.onload=function(){
	document.querySelector('#userInitA').addEventListener('click', function() {
	  context.resume().then(() => {
	    console.log('Playback resumed successfully');
	  });
	  $('#userInit').slideUp();
	});
}



function valueToLogSlide(lo,hi,x){
	var minv = Math.log(lo);
	var maxv = Math.log(hi);
	var scale = (maxv-minv) / 100;
	var dataResult = (Math.log(x)-minv) / scale;
	return dataResult;
}


