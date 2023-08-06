// JUST FOR DEVELOPMENT, REMOVE FOR PRODUCTION

export const testCameraPatch = {
    success: true,
    message: "Camera initialized successfully",
    camera: "Nikon DSC D5300"
}

export const testCameraConfig = {
    "name": "main",
    "info": "",
    "label": "Camera and Driver Configuration",
    "readonly": false,
    "type": "window",
    "children": {
        "actions": {
            "name": "actions",
            "info": "",
            "label": "Camera Actions",
            "readonly": false,
            "type": "section",
            "children": {
                "bulb": {
                    "name": "bulb",
                    "info": "",
                    "label": "Bulb Mode",
                    "readonly": false,
                    "type": "toggle"
                },
                "autofocusdrive": {
                    "name": "autofocusdrive",
                    "info": "",
                    "label": "Drive Nikon DSLR Autofocus",
                    "readonly": false,
                    "type": "toggle",
                    "value": false
                },
                "manualfocusdrive": {
                    "name": "manualfocusdrive",
                    "info": "",
                    "label": "Drive Nikon DSLR Manual focus",
                    "readonly": false,
                    "type": "range",
                    "value": 0,
                    "min": -32767,
                    "max": 32767,
                    "step": 1
                },
                "changeafarea": {
                    "name": "changeafarea",
                    "info": "",
                    "label": "Set Nikon Autofocus area",
                    "readonly": false,
                    "type": "text",
                    "value": "0x0"
                },
                "controlmode": {
                    "name": "controlmode",
                    "info": "",
                    "label": "Set Nikon Control Mode",
                    "readonly": false,
                    "type": "text",
                    "value": "0"
                },
                "viewfinder": {
                    "name": "viewfinder",
                    "info": "",
                    "label": "Nikon Viewfinder",
                    "readonly": false,
                    "type": "toggle",
                    "value": false
                },
                "movie": {
                    "name": "movie",
                    "info": "",
                    "label": "Movie Capture",
                    "readonly": false,
                    "type": "toggle"
                },
                "opcode": {
                    "name": "opcode",
                    "info": "",
                    "label": "PTP Opcode",
                    "readonly": false,
                    "type": "text",
                    "value": "0x1001,0xparam1,0xparam2"
                }
            }
        },
        "settings": {
            "name": "settings",
            "info": "",
            "label": "Camera Settings",
            "readonly": false,
            "type": "section",
            "children": {
                "datetime": {
                    "name": "datetime",
                    "info": "",
                    "label": "Camera Date and Time",
                    "readonly": false,
                    "type": "datetime",
                    "value": 1691008389000
                },
                "imagecomment": {
                    "name": "imagecomment",
                    "info": "",
                    "label": "Image Comment",
                    "readonly": false,
                    "type": "text",
                    "value": "                                    "
                },
                "imagecommentenable": {
                    "name": "imagecommentenable",
                    "info": "",
                    "label": "Enable Image Comment",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "recordingmedia": {
                    "name": "recordingmedia",
                    "info": "",
                    "label": "Recording Media",
                    "readonly": false,
                    "type": "radio",
                    "value": "Card",
                    "choices": [
                        "Card",
                        "SDRAM",
                        "Unknown value 0002"
                    ]
                },
                "cleansensor": {
                    "name": "cleansensor",
                    "info": "",
                    "label": "Clean Sensor",
                    "readonly": false,
                    "type": "radio",
                    "value": "Startup and Shutdown",
                    "choices": [
                        "Off",
                        "Startup",
                        "Shutdown",
                        "Startup and Shutdown"
                    ]
                },
                "thumbsize": {
                    "name": "thumbsize",
                    "info": "",
                    "label": "Thumb Size",
                    "readonly": false,
                    "type": "radio",
                    "value": "",
                    "choices": [
                        "normal",
                        "large"
                    ]
                },
                "fastfs": {
                    "name": "fastfs",
                    "info": "",
                    "label": "Fast Filesystem",
                    "readonly": false,
                    "type": "toggle",
                    "value": true
                },
                "capturetarget": {
                    "name": "capturetarget",
                    "info": "",
                    "label": "Capture Target",
                    "readonly": false,
                    "type": "radio",
                    "value": "Internal RAM",
                    "choices": [
                        "Internal RAM",
                        "Memory card"
                    ]
                },
                "autofocus": {
                    "name": "autofocus",
                    "info": "",
                    "label": "Autofocus",
                    "readonly": false,
                    "type": "radio",
                    "value": "On",
                    "choices": [
                        "On",
                        "Off"
                    ]
                }
            }
        },
        "status": {
            "name": "status",
            "info": "",
            "label": "Camera Status Information",
            "readonly": false,
            "type": "section",
            "children": {
                "serialnumber": {
                    "name": "serialnumber",
                    "info": "",
                    "label": "Serial Number",
                    "readonly": true,
                    "type": "text",
                    "value": "00000000000000000000000006909849"
                },
                "manufacturer": {
                    "name": "manufacturer",
                    "info": "",
                    "label": "Camera Manufacturer",
                    "readonly": true,
                    "type": "text",
                    "value": "Nikon Corporation"
                },
                "cameramodel": {
                    "name": "cameramodel",
                    "info": "",
                    "label": "Camera Model",
                    "readonly": true,
                    "type": "text",
                    "value": "D5300"
                },
                "deviceversion": {
                    "name": "deviceversion",
                    "info": "",
                    "label": "Device Version",
                    "readonly": true,
                    "type": "text",
                    "value": "V1.03"
                },
                "vendorextension": {
                    "name": "vendorextension",
                    "info": "",
                    "label": "Vendor Extension",
                    "readonly": true,
                    "type": "text",
                    "value": "microsoft.com: 1.0"
                },
                "acpower": {
                    "name": "acpower",
                    "info": "",
                    "label": "AC Power",
                    "readonly": true,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "externalflash": {
                    "name": "externalflash",
                    "info": "",
                    "label": "External Flash",
                    "readonly": true,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "batterylevel": {
                    "name": "batterylevel",
                    "info": "",
                    "label": "Battery Level",
                    "readonly": true,
                    "type": "text",
                    "value": "100%"
                },
                "continousshootingcount": {
                    "name": "continousshootingcount",
                    "info": "",
                    "label": "Continuous Shooting Count",
                    "readonly": true,
                    "type": "range",
                    "value": 5,
                    "min": 0,
                    "max": 62,
                    "step": 1
                },
                "orientation": {
                    "name": "orientation",
                    "info": "",
                    "label": "Camera Orientation",
                    "readonly": true,
                    "type": "radio",
                    "value": "0'",
                    "choices": [
                        "0'",
                        "270'",
                        "90'",
                        "180'"
                    ]
                },
                "flashopen": {
                    "name": "flashopen",
                    "info": "",
                    "label": "Flash Open",
                    "readonly": true,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "flashcharged": {
                    "name": "flashcharged",
                    "info": "",
                    "label": "Flash Charged",
                    "readonly": true,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "availableshots": {
                    "name": "availableshots",
                    "info": "",
                    "label": "Available Shots",
                    "readonly": true,
                    "type": "range",
                    "value": 3985,
                    "min": 0,
                    "max": 65535,
                    "step": 1
                },
                "minfocallength": {
                    "name": "minfocallength",
                    "info": "",
                    "label": "Focal Length Minimum",
                    "readonly": true,
                    "type": "text",
                    "value": "17 mm"
                },
                "maxfocallength": {
                    "name": "maxfocallength",
                    "info": "",
                    "label": "Focal Length Maximum",
                    "readonly": true,
                    "type": "text",
                    "value": "55 mm"
                },
                "apertureatminfocallength": {
                    "name": "apertureatminfocallength",
                    "info": "",
                    "label": "Maximum Aperture at Focal Length Minimum",
                    "readonly": true,
                    "type": "text",
                    "value": "3"
                },
                "apertureatmaxfocallength": {
                    "name": "apertureatmaxfocallength",
                    "info": "",
                    "label": "Maximum Aperture at Focal Length Maximum",
                    "readonly": true,
                    "type": "text",
                    "value": "3"
                },
                "lowlight": {
                    "name": "lowlight",
                    "info": "",
                    "label": "Low Light",
                    "readonly": true,
                    "type": "range",
                    "value": 1,
                    "min": 0,
                    "max": 3,
                    "step": 1
                },
                "lightmeter": {
                    "name": "lightmeter",
                    "info": "",
                    "label": "Light Meter",
                    "readonly": true,
                    "type": "range",
                    "value": 0,
                    "min": -60,
                    "max": 60,
                    "step": 1
                },
                "aflocked": {
                    "name": "aflocked",
                    "info": "",
                    "label": "AF Locked",
                    "readonly": true,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "aelocked": {
                    "name": "aelocked",
                    "info": "",
                    "label": "AE Locked",
                    "readonly": true,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "movieprohibit": {
                    "name": "movieprohibit",
                    "info": "",
                    "label": "Movie Prohibit Condition",
                    "readonly": true,
                    "type": "text",
                    "value": "Movie prohibit conditions: Not in application mode"
                },
                "liveviewprohibit": {
                    "name": "liveviewprohibit",
                    "info": "",
                    "label": "Liveview Prohibit Condition",
                    "readonly": true,
                    "type": "text",
                    "value": "Liveview should not be prohibited"
                }
            }
        },
        "imgsettings": {
            "name": "imgsettings",
            "info": "",
            "label": "Image Settings",
            "readonly": false,
            "type": "section",
            "children": {
                "imagesize": {
                    "name": "imagesize",
                    "info": "",
                    "label": "Image Size",
                    "readonly": false,
                    "type": "radio",
                    "value": "6000x4000",
                    "choices": [
                        "6000x4000",
                        "4496x3000",
                        "2992x2000"
                    ]
                },
                "iso": {
                    "name": "iso",
                    "info": "",
                    "label": "ISO Speed",
                    "readonly": false,
                    "type": "radio",
                    "value": "400",
                    "choices": [
                        "100",
                        "125",
                        "160",
                        "200",
                        "250",
                        "320",
                        "400",
                        "500",
                        "640",
                        "800",
                        "1000",
                        "1250",
                        "1600",
                        "2000",
                        "2500",
                        "3200",
                        "4000",
                        "5000",
                        "6400",
                        "8000",
                        "10000",
                        "12800",
                        "16000",
                        "20000",
                        "25600"
                    ]
                },
                "isoauto": {
                    "name": "isoauto",
                    "info": "",
                    "label": "ISO Auto",
                    "readonly": false,
                    "type": "radio",
                    "value": "On",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "autoiso": {
                    "name": "autoiso",
                    "info": "",
                    "label": "Auto ISO",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "whitebalance": {
                    "name": "whitebalance",
                    "info": "",
                    "label": "WhiteBalance",
                    "readonly": false,
                    "type": "radio",
                    "value": "Automatic",
                    "choices": [
                        "Automatic",
                        "Daylight",
                        "Fluorescent",
                        "Tungsten",
                        "Flash",
                        "Cloudy",
                        "Shade",
                        "Preset"
                    ]
                },
                "colorspace": {
                    "name": "colorspace",
                    "info": "",
                    "label": "Color Space",
                    "readonly": false,
                    "type": "radio",
                    "value": "sRGB",
                    "choices": [
                        "sRGB",
                        "AdobeRGB"
                    ]
                }
            }
        },
        "capturesettings": {
            "name": "capturesettings",
            "info": "",
            "label": "Capture Settings",
            "readonly": false,
            "type": "section",
            "children": {
                "minimumshutterspeed": {
                    "name": "minimumshutterspeed",
                    "info": "",
                    "label": "Minimum Shutter Speed",
                    "readonly": false,
                    "type": "radio",
                    "value": "1/200",
                    "choices": [
                        "1/2000",
                        "1/1600",
                        "1/1250",
                        "1/1000",
                        "1/800",
                        "1/640",
                        "1/500",
                        "1/400",
                        "1/320",
                        "1/250",
                        "1/200",
                        "1/160",
                        "1/125",
                        "1/100",
                        "1/80",
                        "1/60",
                        "1/50",
                        "1/40",
                        "1/30",
                        "1/15",
                        "1/8",
                        "1/4",
                        "1/2",
                        "1",
                        "Unknown value 0018"
                    ]
                },
                "isoautohilimit": {
                    "name": "isoautohilimit",
                    "info": "",
                    "label": "ISO Auto Hi Limit",
                    "readonly": false,
                    "type": "radio",
                    "value": "3200",
                    "choices": [
                        "400",
                        "800",
                        "1600",
                        "3200",
                        "Hi 1",
                        "Hi 2",
                        "Unknown value 0006",
                        "Unknown value 0007"
                    ]
                },
                "dlighting": {
                    "name": "dlighting",
                    "info": "",
                    "label": "Active D-Lighting",
                    "readonly": false,
                    "type": "radio",
                    "value": "Auto",
                    "choices": [
                        "Extra high",
                        "High",
                        "Normal",
                        "Low",
                        "Off",
                        "Auto"
                    ]
                },
                "highisonr": {
                    "name": "highisonr",
                    "info": "",
                    "label": "High ISO Noise Reduction",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "Off",
                        "Low",
                        "Normal",
                        "High"
                    ]
                },
                "moviequality": {
                    "name": "moviequality",
                    "info": "",
                    "label": "Movie Quality",
                    "readonly": false,
                    "type": "radio",
                    "value": "320x216",
                    "choices": [
                        "320x216",
                        "640x424",
                        "1280x720",
                        "Unknown value 0003",
                        "Unknown value 0004",
                        "Unknown value 0005"
                    ]
                },
                "liveviewsize": {
                    "name": "liveviewsize",
                    "info": "",
                    "label": "Live View Size",
                    "readonly": false,
                    "type": "radio",
                    "value": "VGA",
                    "choices": [
                        "QVGA",
                        "VGA"
                    ]
                },
                "longexpnr": {
                    "name": "longexpnr",
                    "info": "",
                    "label": "Long Exp Noise Reduction",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "assistlight": {
                    "name": "assistlight",
                    "info": "",
                    "label": "Assist Light",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "exposurecompensation": {
                    "name": "exposurecompensation",
                    "info": "",
                    "label": "Exposure Compensation",
                    "readonly": false,
                    "type": "radio",
                    "value": "0",
                    "choices": [
                        "-5",
                        "-4.5",
                        "-4",
                        "-3.5",
                        "-3",
                        "-2.5",
                        "-2",
                        "-1.5",
                        "-1",
                        "-0.5",
                        "0",
                        "0.5",
                        "1",
                        "1.5",
                        "2",
                        "2.5",
                        "3",
                        "3.5",
                        "4",
                        "4.5",
                        "5"
                    ]
                },
                "flashmode": {
                    "name": "flashmode",
                    "info": "",
                    "label": "Flash Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Auto",
                    "choices": [
                        "Red-eye automatic",
                        "Auto",
                        "Auto Slow Sync",
                        "Rear Curtain Sync + Slow Sync",
                        "Red-eye Reduction + Slow Sync"
                    ]
                },
                "nikonflashmode": {
                    "name": "nikonflashmode",
                    "info": "",
                    "label": "Nikon Flash Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Manual",
                    "choices": [
                        "iTTL",
                        "Manual"
                    ]
                },
                "f-number": {
                    "name": "f-number",
                    "info": "",
                    "label": "F-Number",
                    "readonly": false,
                    "type": "radio",
                    "value": "f/2.8",
                    "choices": [
                        "f/2.8",
                        "f/3.3",
                        "f/4",
                        "f/4.8",
                        "f/5.6",
                        "f/6.7",
                        "f/8",
                        "f/9.5",
                        "f/11",
                        "f/13",
                        "f/16",
                        "f/19",
                        "f/22"
                    ]
                },
                "flexibleprogram": {
                    "name": "flexibleprogram",
                    "info": "",
                    "label": "Flexible Program",
                    "readonly": false,
                    "type": "range",
                    "value": 0,
                    "min": -30,
                    "max": 30,
                    "step": 3
                },
                "imagequality": {
                    "name": "imagequality",
                    "info": "",
                    "label": "Image Quality",
                    "readonly": false,
                    "type": "radio",
                    "value": "JPEG Fine",
                    "choices": [
                        "JPEG Basic",
                        "JPEG Normal",
                        "JPEG Fine",
                        "NEF (Raw)",
                        "NEF+Basic",
                        "NEF+Normal",
                        "NEF+Fine"
                    ]
                },
                "focallength": {
                    "name": "focallength",
                    "info": "",
                    "label": "Focal Length",
                    "readonly": true,
                    "type": "range",
                    "value": 22,
                    "min": 17,
                    "max": 55,
                    "step": 0.009999999776482582
                },
                "focusmode": {
                    "name": "focusmode",
                    "info": "",
                    "label": "Focus Mode",
                    "readonly": true,
                    "type": "radio",
                    "value": "Manual",
                    "choices": [
                        "Manual",
                        "AF-S",
                        "AF-C",
                        "AF-A",
                        "Unknown value 8013"
                    ]
                },
                "focusmode2": {
                    "name": "focusmode2",
                    "info": "",
                    "label": "Focus Mode 2",
                    "readonly": false,
                    "type": "radio",
                    "value": "MF (fixed)",
                    "choices": [
                        "AF-S",
                        "AF-C",
                        "AF-A",
                        "MF (fixed)",
                        "MF (selection)"
                    ]
                },
                "effectmode": {
                    "name": "effectmode",
                    "info": "",
                    "label": "Effect Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Color sketch",
                    "choices": [
                        "Night Vision",
                        "Color sketch",
                        "Miniature effect",
                        "Selective color",
                        "Silhouette",
                        "High key",
                        "Low key",
                        "Unknown value 0007",
                        "Unknown value 0008"
                    ]
                },
                "expprogram": {
                    "name": "expprogram",
                    "info": "",
                    "label": "Exposure Program",
                    "readonly": true,
                    "type": "radio",
                    "value": "A",
                    "choices": [
                        "M",
                        "P",
                        "A",
                        "S",
                        "Auto",
                        "Portrait",
                        "Landscape",
                        "Macro",
                        "Sports",
                        "Night Landscape",
                        "Children",
                        "Automatic (No Flash)",
                        "Unknown value 8019"
                    ]
                },
                "scenemode": {
                    "name": "scenemode",
                    "info": "",
                    "label": "Scene Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Night Portrait",
                    "choices": [
                        "Night landscape",
                        "Party/Indoor",
                        "Beach/Snow",
                        "Sunset",
                        "Dusk/Dawn",
                        "Pet Portrait",
                        "Candlelight",
                        "Blossom",
                        "Autumn colors",
                        "Food",
                        "Unknown value 000a",
                        "Unknown value 000b",
                        "Unknown value 000c",
                        "Portrait",
                        "Landscape",
                        "Child",
                        "Sports",
                        "Close up",
                        "Night Portrait"
                    ]
                },
                "hdrmode": {
                    "name": "hdrmode",
                    "info": "",
                    "label": "HDR Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "capturemode": {
                    "name": "capturemode",
                    "info": "",
                    "label": "Still Capture Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Burst",
                    "choices": [
                        "Single Shot",
                        "Burst",
                        "Continuous Low Speed",
                        "Timer",
                        "Quick Response Remote",
                        "Delayed Remote",
                        "Quiet Release"
                    ]
                },
                "focusmetermode": {
                    "name": "focusmetermode",
                    "info": "",
                    "label": "Focus Metering Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Single Area",
                    "choices": [
                        "Multi-spot",
                        "Single Area",
                        "Closest Subject",
                        "Group Dynamic",
                        "Unknown value 8013",
                        "Unknown value 8014"
                    ]
                },
                "exposuremetermode": {
                    "name": "exposuremetermode",
                    "info": "",
                    "label": "Exposure Metering Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Center Spot",
                    "choices": [
                        "Center Weighted",
                        "Multi Spot",
                        "Center Spot"
                    ]
                },
                "shutterspeed": {
                    "name": "shutterspeed",
                    "info": "",
                    "label": "Shutter Speed",
                    "readonly": true,
                    "type": "radio",
                    "value": "0.5000s",
                    "choices": [
                        "0.0002s",
                        "0.0003s",
                        "0.0005s",
                        "0.0006s",
                        "0.0010s",
                        "0.0013s",
                        "0.0020s",
                        "0.0028s",
                        "0.0040s",
                        "0.0055s",
                        "0.0080s",
                        "0.0111s",
                        "0.0166s",
                        "0.0222s",
                        "0.0333s",
                        "0.0500s",
                        "0.0666s",
                        "0.1000s",
                        "0.1250s",
                        "0.1666s",
                        "0.2500s",
                        "0.3333s",
                        "0.5000s",
                        "0.6666s",
                        "1.0000s",
                        "1.5000s",
                        "2.0000s",
                        "3.0000s",
                        "4.0000s",
                        "6.0000s",
                        "8.0000s",
                        "10.0000s",
                        "15.0000s",
                        "20.0000s",
                        "30.0000s"
                    ]
                },
                "shutterspeed2": {
                    "name": "shutterspeed2",
                    "info": "",
                    "label": "Shutter Speed 2",
                    "readonly": true,
                    "type": "radio",
                    "value": "1/2",
                    "choices": [
                        "1/4000",
                        "1/3000",
                        "1/2000",
                        "1/1500",
                        "1/1000",
                        "1/750",
                        "1/500",
                        "1/350",
                        "1/250",
                        "1/180",
                        "1/125",
                        "1/90",
                        "1/60",
                        "1/45",
                        "1/30",
                        "1/20",
                        "1/15",
                        "1/10",
                        "1/8",
                        "1/6",
                        "1/4",
                        "1/3",
                        "1/2",
                        "10/15",
                        "1",
                        "15/10",
                        "2",
                        "3",
                        "4",
                        "6",
                        "8",
                        "10",
                        "15",
                        "20",
                        "30"
                    ]
                },
                "exposuredelaymode": {
                    "name": "exposuredelaymode",
                    "info": "",
                    "label": "Exposure Delay Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "liveviewafmode": {
                    "name": "liveviewafmode",
                    "info": "",
                    "label": "Live View AF Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Face-priority AF",
                    "choices": [
                        "Face-priority AF",
                        "Wide-area AF",
                        "Normal-area AF",
                        "Subject-tracking AF"
                    ]
                },
                "liveviewaffocus": {
                    "name": "liveviewaffocus",
                    "info": "",
                    "label": "Live View AF Focus",
                    "readonly": false,
                    "type": "radio",
                    "value": "Manual Focus (fixed)",
                    "choices": [
                        "Single-servo AF",
                        "Full-time-servo AF",
                        "Manual Focus (fixed)",
                        "Manual Focus (selection)"
                    ]
                },
                "liveviewimagezoomratio": {
                    "name": "liveviewimagezoomratio",
                    "info": "",
                    "label": "Live View Image Zoom Ratio",
                    "readonly": false,
                    "type": "radio",
                    "value": "Entire Display",
                    "choices": [
                        "Entire Display",
                        "Unknown value 0001",
                        "25%",
                        "Unknown value 0003",
                        "50%",
                        "Unknown value 0005"
                    ]
                },
                "filenrsequencing": {
                    "name": "filenrsequencing",
                    "info": "",
                    "label": "File Number Sequencing",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "imagerotationflag": {
                    "name": "imagerotationflag",
                    "info": "",
                    "label": "Image Rotation Flag",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "nocfcardrelease": {
                    "name": "nocfcardrelease",
                    "info": "",
                    "label": "Release without CF card",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "autofocusarea": {
                    "name": "autofocusarea",
                    "info": "",
                    "label": "Auto Focus Area",
                    "readonly": false,
                    "type": "radio",
                    "value": "Top",
                    "choices": [
                        "Top",
                        "Bottom",
                        "Left",
                        "Right",
                        "Unknown value 0005",
                        "Unknown value 0006",
                        "Unknown value 0007",
                        "Unknown value 0008",
                        "Unknown value 0009",
                        "Unknown value 000a",
                        "Unknown value 000b",
                        "Unknown value 000c",
                        "Unknown value 000d",
                        "Unknown value 000e",
                        "Unknown value 000f",
                        "Unknown value 0010",
                        "Unknown value 0011",
                        "Unknown value 0012",
                        "Unknown value 0013",
                        "Unknown value 0014",
                        "Unknown value 0015",
                        "Unknown value 0016",
                        "Unknown value 0017",
                        "Unknown value 0018",
                        "Unknown value 0019",
                        "Unknown value 001a",
                        "Unknown value 001b",
                        "Unknown value 001c",
                        "Unknown value 001d",
                        "Unknown value 001e",
                        "Unknown value 001f",
                        "Unknown value 0020",
                        "Unknown value 0021",
                        "Unknown value 0022",
                        "Unknown value 0023",
                        "Unknown value 0024",
                        "Unknown value 0025",
                        "Unknown value 0026",
                        "Unknown value 0027"
                    ]
                },
                "flashexposurecompensation": {
                    "name": "flashexposurecompensation",
                    "info": "",
                    "label": "Flash Exposure Compensation",
                    "readonly": false,
                    "type": "range",
                    "value": 0,
                    "min": -3,
                    "max": 1,
                    "step": 0.5
                },
                "bracketing": {
                    "name": "bracketing",
                    "info": "",
                    "label": "Bracketing",
                    "readonly": false,
                    "type": "radio",
                    "value": "Off",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "evstep": {
                    "name": "evstep",
                    "info": "",
                    "label": "EV Step",
                    "readonly": false,
                    "type": "radio",
                    "value": "1/2",
                    "choices": [
                        "1/3",
                        "1/2"
                    ]
                },
                "bracketset": {
                    "name": "bracketset",
                    "info": "",
                    "label": "Bracket Set",
                    "readonly": false,
                    "type": "radio",
                    "value": "AE only",
                    "choices": [
                        "AE & Flash",
                        "AE only",
                        "Flash only",
                        "WB bracketing",
                        "ADL bracketing"
                    ]
                },
                "aebracketingstep": {
                    "name": "aebracketingstep",
                    "info": "",
                    "label": "AE Bracketing Step",
                    "readonly": false,
                    "type": "radio",
                    "value": "1 EV",
                    "choices": [
                        "1/3 EV",
                        "1/2 EV",
                        "2/3 EV",
                        "1 EV",
                        "2 EV",
                        "3 EV",
                        "Unknown value 0006",
                        "Unknown value 0007"
                    ]
                },
                "wbbracketingstep": {
                    "name": "wbbracketingstep",
                    "info": "",
                    "label": "WB Bracketing Step",
                    "readonly": true,
                    "type": "radio",
                    "value": "1 EV",
                    "choices": [
                        "1 EV",
                        "2 EV",
                        "3 EV"
                    ]
                },
                "aebracketingpattern": {
                    "name": "aebracketingpattern",
                    "info": "",
                    "label": "AE Bracketing Pattern",
                    "readonly": true,
                    "type": "radio",
                    "value": "3 images (normal and 2 unders)",
                    "choices": [
                        "3 images (normal and 2 unders)"
                    ]
                },
                "wbbracketingpattern": {
                    "name": "wbbracketingpattern",
                    "info": "",
                    "label": "WB Bracketing Pattern",
                    "readonly": true,
                    "type": "radio",
                    "value": "3 images (normal and 2 unders)",
                    "choices": [
                        "3 images (normal and 2 unders)"
                    ]
                },
                "aebracketingcount": {
                    "name": "aebracketingcount",
                    "info": "",
                    "label": "AE Bracketing Count",
                    "readonly": true,
                    "type": "range",
                    "value": 1,
                    "min": 1,
                    "max": 3,
                    "step": 1
                },
                "adlbracketingpattern": {
                    "name": "adlbracketingpattern",
                    "info": "",
                    "label": "ADL Bracketing Pattern",
                    "readonly": true,
                    "type": "radio",
                    "value": "2 shots (Off -> User setting)",
                    "choices": [
                        "2 shots (Off -> User setting)"
                    ]
                },
                "burstnumber": {
                    "name": "burstnumber",
                    "info": "",
                    "label": "Burst Number",
                    "readonly": false,
                    "type": "range",
                    "value": 1,
                    "min": 1,
                    "max": 100,
                    "step": 1
                },
                "autowhitebias": {
                    "name": "autowhitebias",
                    "info": "",
                    "label": "Auto White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "tungstenwhitebias": {
                    "name": "tungstenwhitebias",
                    "info": "",
                    "label": "Tungsten White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "flourescentwhitebias": {
                    "name": "flourescentwhitebias",
                    "info": "",
                    "label": "Fluorescent White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "daylightwhitebias": {
                    "name": "daylightwhitebias",
                    "info": "",
                    "label": "Daylight White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "flashwhitebias": {
                    "name": "flashwhitebias",
                    "info": "",
                    "label": "Flash White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "cloudywhitebias": {
                    "name": "cloudywhitebias",
                    "info": "",
                    "label": "Cloudy White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "shadewhitebias": {
                    "name": "shadewhitebias",
                    "info": "",
                    "label": "Shady White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "whitebiaspresetno": {
                    "name": "whitebiaspresetno",
                    "info": "",
                    "label": "White Balance Bias Preset Nr",
                    "readonly": false,
                    "type": "radio",
                    "value": "0",
                    "choices": [
                        "0"
                    ]
                },
                "whitebiaspreset0": {
                    "name": "whitebiaspreset0",
                    "info": "",
                    "label": "White Balance Bias Preset 0",
                    "readonly": true,
                    "type": "text",
                    "value": "34472293"
                },
                "whitebiaspreset1": {
                    "name": "whitebiaspreset1",
                    "info": "",
                    "label": "White Balance Bias Preset 1",
                    "readonly": true,
                    "type": "text",
                    "value": "34472293"
                },
                "applicationmode": {
                    "name": "applicationmode",
                    "info": "",
                    "label": "Application Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "Application Mode 0",
                    "choices": [
                        "Application Mode 0",
                        "Application Mode 1"
                    ]
                },
                "manualmoviesetting": {
                    "name": "manualmoviesetting",
                    "info": "",
                    "label": "Manual Movie Setting",
                    "readonly": false,
                    "type": "radio",
                    "value": "On",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "microphone": {
                    "name": "microphone",
                    "info": "",
                    "label": "Microphone",
                    "readonly": false,
                    "type": "radio",
                    "value": "Auto sensitivity",
                    "choices": [
                        "Auto sensitivity",
                        "High sensitivity",
                        "Medium sensitivity",
                        "Low sensitivity",
                        "Microphone off",
                        "Unknown value 0005"
                    ]
                },
                "autodistortioncontrol": {
                    "name": "autodistortioncontrol",
                    "info": "",
                    "label": "Auto Distortion Control",
                    "readonly": false,
                    "type": "radio",
                    "value": "On",
                    "choices": [
                        "On",
                        "Off"
                    ]
                },
                "videomode": {
                    "name": "videomode",
                    "info": "",
                    "label": "Video Mode",
                    "readonly": false,
                    "type": "radio",
                    "value": "NTSC",
                    "choices": [
                        "NTSC",
                        "PAL"
                    ]
                }
            }
        },
        "other": {
            "name": "other",
            "info": "",
            "label": "Other PTP Device Properties",
            "readonly": false,
            "type": "section",
            "children": {
                "5001": {
                    "name": "5001",
                    "info": "",
                    "label": "Battery Level",
                    "readonly": true,
                    "type": "menu",
                    "value": "100",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "29",
                        "30",
                        "31",
                        "32",
                        "33",
                        "34",
                        "35",
                        "36",
                        "37",
                        "38",
                        "39",
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45",
                        "46",
                        "47",
                        "48",
                        "49",
                        "50",
                        "51",
                        "52",
                        "53",
                        "54",
                        "55",
                        "56",
                        "57",
                        "58",
                        "59",
                        "60",
                        "61",
                        "62",
                        "63",
                        "64",
                        "65",
                        "66",
                        "67",
                        "68",
                        "69",
                        "70",
                        "71",
                        "72",
                        "73",
                        "74",
                        "75",
                        "76",
                        "77",
                        "78",
                        "79",
                        "80",
                        "81",
                        "82",
                        "83",
                        "84",
                        "85",
                        "86",
                        "87",
                        "88",
                        "89",
                        "90",
                        "91",
                        "92",
                        "93",
                        "94",
                        "95",
                        "96",
                        "97",
                        "98",
                        "99",
                        "100"
                    ]
                },
                "5003": {
                    "name": "5003",
                    "info": "",
                    "label": "Image Size",
                    "readonly": false,
                    "type": "menu",
                    "value": "6000x4000",
                    "choices": [
                        "6000x4000",
                        "4496x3000",
                        "2992x2000"
                    ]
                },
                "5004": {
                    "name": "5004",
                    "info": "",
                    "label": "Compression Setting",
                    "readonly": false,
                    "type": "menu",
                    "value": "2",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "4",
                        "5",
                        "6",
                        "7"
                    ]
                },
                "5005": {
                    "name": "5005",
                    "info": "",
                    "label": "White Balance",
                    "readonly": false,
                    "type": "menu",
                    "value": "2",
                    "choices": [
                        "2",
                        "4",
                        "5",
                        "6",
                        "7",
                        "32784",
                        "32785",
                        "32787"
                    ]
                },
                "5007": {
                    "name": "5007",
                    "info": "",
                    "label": "F-Number",
                    "readonly": false,
                    "type": "menu",
                    "value": "280",
                    "choices": [
                        "280",
                        "330",
                        "400",
                        "480",
                        "560",
                        "670",
                        "800",
                        "950",
                        "1100",
                        "1300",
                        "1600",
                        "1900",
                        "2200"
                    ]
                },
                "5008": {
                    "name": "5008",
                    "info": "",
                    "label": "Focal Length",
                    "readonly": true,
                    "type": "range",
                    "value": 2200,
                    "min": 1700,
                    "max": 5500,
                    "step": 1
                },
                "5010": {
                    "name": "5010",
                    "info": "",
                    "label": "Exposure Bias Compensation",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "-5000",
                        "-4500",
                        "-4000",
                        "-3500",
                        "-3000",
                        "-2500",
                        "-2000",
                        "-1500",
                        "-1000",
                        "-500",
                        "0",
                        "500",
                        "1000",
                        "1500",
                        "2000",
                        "2500",
                        "3000",
                        "3500",
                        "4000",
                        "4500",
                        "5000"
                    ]
                },
                "5011": {
                    "name": "5011",
                    "info": "",
                    "label": "Date & Time",
                    "readonly": false,
                    "type": "text",
                    "value": "20230802T223309"
                },
                "5013": {
                    "name": "5013",
                    "info": "",
                    "label": "Still Capture Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "2",
                    "choices": [
                        "1",
                        "2",
                        "32784",
                        "32785",
                        "32788",
                        "32789",
                        "32790"
                    ]
                },
                "5018": {
                    "name": "5018",
                    "info": "",
                    "label": "Burst Number",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "29",
                        "30",
                        "31",
                        "32",
                        "33",
                        "34",
                        "35",
                        "36",
                        "37",
                        "38",
                        "39",
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45",
                        "46",
                        "47",
                        "48",
                        "49",
                        "50",
                        "51",
                        "52",
                        "53",
                        "54",
                        "55",
                        "56",
                        "57",
                        "58",
                        "59",
                        "60",
                        "61",
                        "62",
                        "63",
                        "64",
                        "65",
                        "66",
                        "67",
                        "68",
                        "69",
                        "70",
                        "71",
                        "72",
                        "73",
                        "74",
                        "75",
                        "76",
                        "77",
                        "78",
                        "79",
                        "80",
                        "81",
                        "82",
                        "83",
                        "84",
                        "85",
                        "86",
                        "87",
                        "88",
                        "89",
                        "90",
                        "91",
                        "92",
                        "93",
                        "94",
                        "95",
                        "96",
                        "97",
                        "98",
                        "99",
                        "100"
                    ]
                },
                "500a": {
                    "name": "500a",
                    "info": "",
                    "label": "Focus Mode",
                    "readonly": true,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "1",
                        "32784",
                        "32785",
                        "32786",
                        "32787"
                    ]
                },
                "500b": {
                    "name": "500b",
                    "info": "",
                    "label": "Exposure Metering Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "4",
                    "choices": [
                        "2",
                        "3",
                        "4"
                    ]
                },
                "500c": {
                    "name": "500c",
                    "info": "",
                    "label": "Flash Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "32784",
                    "choices": [
                        "4",
                        "32784",
                        "32785",
                        "32786",
                        "32787"
                    ]
                },
                "500d": {
                    "name": "500d",
                    "info": "",
                    "label": "Exposure Time",
                    "readonly": true,
                    "type": "menu",
                    "value": "5000",
                    "choices": [
                        "2",
                        "3",
                        "5",
                        "6",
                        "10",
                        "13",
                        "20",
                        "28",
                        "40",
                        "55",
                        "80",
                        "111",
                        "166",
                        "222",
                        "333",
                        "500",
                        "666",
                        "1000",
                        "1250",
                        "1666",
                        "2500",
                        "3333",
                        "5000",
                        "6666",
                        "10000",
                        "15000",
                        "20000",
                        "30000",
                        "40000",
                        "60000",
                        "80000",
                        "100000",
                        "150000",
                        "200000",
                        "300000"
                    ]
                },
                "500e": {
                    "name": "500e",
                    "info": "",
                    "label": "Exposure Program Mode",
                    "readonly": true,
                    "type": "menu",
                    "value": "3",
                    "choices": [
                        "1",
                        "2",
                        "3",
                        "4",
                        "32784",
                        "32785",
                        "32786",
                        "32787",
                        "32788",
                        "32790",
                        "32791",
                        "32792",
                        "32793"
                    ]
                },
                "500f": {
                    "name": "500f",
                    "info": "",
                    "label": "Exposure Index (film speed ISO)",
                    "readonly": false,
                    "type": "menu",
                    "value": "400",
                    "choices": [
                        "100",
                        "125",
                        "160",
                        "200",
                        "250",
                        "320",
                        "400",
                        "500",
                        "640",
                        "800",
                        "1000",
                        "1250",
                        "1600",
                        "2000",
                        "2500",
                        "3200",
                        "4000",
                        "5000",
                        "6400",
                        "8000",
                        "10000",
                        "12800",
                        "16000",
                        "20000",
                        "25600"
                    ]
                },
                "501c": {
                    "name": "501c",
                    "info": "",
                    "label": "Focus Metering Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "32784",
                    "choices": [
                        "2",
                        "32784",
                        "32785",
                        "32786",
                        "32787",
                        "32788"
                    ]
                },
                "d303": {
                    "name": "d303",
                    "info": "",
                    "label": "UseDeviceStageFlag",
                    "readonly": true,
                    "type": "text",
                    "value": "1"
                },
                "d406": {
                    "name": "d406",
                    "info": "",
                    "label": "PTP Property 0xd406",
                    "readonly": false,
                    "type": "text",
                    "value": "Windows/6.0.5330.0 MTPClassDriver/6.0.5330.0"
                },
                "d407": {
                    "name": "d407",
                    "info": "",
                    "label": "PTP Property 0xd407",
                    "readonly": true,
                    "type": "text",
                    "value": "1"
                },
                "d015": {
                    "name": "d015",
                    "info": "",
                    "label": "Reset Bank 0",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d017": {
                    "name": "d017",
                    "info": "",
                    "label": "Auto White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "d018": {
                    "name": "d018",
                    "info": "",
                    "label": "Tungsten White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "d019": {
                    "name": "d019",
                    "info": "",
                    "label": "Fluorescent White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "d01a": {
                    "name": "d01a",
                    "info": "",
                    "label": "Daylight White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "d01b": {
                    "name": "d01b",
                    "info": "",
                    "label": "Flash White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "d01c": {
                    "name": "d01c",
                    "info": "",
                    "label": "Cloudy White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "d01d": {
                    "name": "d01d",
                    "info": "",
                    "label": "Shady White Balance Bias",
                    "readonly": false,
                    "type": "range",
                    "value": 84,
                    "min": 0,
                    "max": 168,
                    "step": 1
                },
                "d01f": {
                    "name": "d01f",
                    "info": "",
                    "label": "White Balance Preset Number",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d025": {
                    "name": "d025",
                    "info": "",
                    "label": "White Balance Preset Value 0",
                    "readonly": true,
                    "type": "text",
                    "value": "34472293"
                },
                "d026": {
                    "name": "d026",
                    "info": "",
                    "label": "White Balance Preset Value 1",
                    "readonly": true,
                    "type": "text",
                    "value": "34472293"
                },
                "d032": {
                    "name": "d032",
                    "info": "",
                    "label": "Color Space",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d036": {
                    "name": "d036",
                    "info": "",
                    "label": "Video Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d037": {
                    "name": "d037",
                    "info": "",
                    "label": "Effect Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8"
                    ]
                },
                "d045": {
                    "name": "d045",
                    "info": "",
                    "label": "Reset Menu Bank",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d048": {
                    "name": "d048",
                    "info": "",
                    "label": "PTP_DPC_NIKON_A1AFCModePriority",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d054": {
                    "name": "d054",
                    "info": "",
                    "label": "Auto ISO",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d056": {
                    "name": "d056",
                    "info": "",
                    "label": "Exposure Step",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d05d": {
                    "name": "d05d",
                    "info": "",
                    "label": "Live View AF Area",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d061": {
                    "name": "d061",
                    "info": "",
                    "label": "Live View AF Focus",
                    "readonly": false,
                    "type": "menu",
                    "value": "3",
                    "choices": [
                        "0",
                        "2",
                        "3",
                        "4"
                    ]
                },
                "d066": {
                    "name": "d066",
                    "info": "",
                    "label": "Auto Off Timers",
                    "readonly": false,
                    "type": "menu",
                    "value": "3",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d06a": {
                    "name": "d06a",
                    "info": "",
                    "label": "Exposure delay mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d06b": {
                    "name": "d06b",
                    "info": "",
                    "label": "Long Exposure Noise Reduction",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d06c": {
                    "name": "d06c",
                    "info": "",
                    "label": "File Number Sequencing",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2"
                    ]
                },
                "d070": {
                    "name": "d070",
                    "info": "",
                    "label": "High ISO noise reduction",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d078": {
                    "name": "d078",
                    "info": "",
                    "label": "Bracket Set",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4"
                    ]
                },
                "d08a": {
                    "name": "d08a",
                    "info": "",
                    "label": "No CF Card Release",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d08d": {
                    "name": "d08d",
                    "info": "",
                    "label": "AF Area Point",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d08f": {
                    "name": "d08f",
                    "info": "",
                    "label": "Clean Image Sensor",
                    "readonly": false,
                    "type": "menu",
                    "value": "3",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d090": {
                    "name": "d090",
                    "info": "",
                    "label": "Image Comment String",
                    "readonly": false,
                    "type": "text",
                    "value": "                                    "
                },
                "d091": {
                    "name": "d091",
                    "info": "",
                    "label": "Image Comment Enable",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d092": {
                    "name": "d092",
                    "info": "",
                    "label": "Image Rotation",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d09c": {
                    "name": "d09c",
                    "info": "",
                    "label": "RetractableLensWarning",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d0a0": {
                    "name": "d0a0",
                    "info": "",
                    "label": "Movie Screen Size",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]
                },
                "d0a2": {
                    "name": "d0a2",
                    "info": "",
                    "label": "Movie Microphone",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]
                },
                "d0a4": {
                    "name": "d0a4",
                    "info": "",
                    "label": "MovRecProhibitCondition",
                    "readonly": true,
                    "type": "text",
                    "value": "16384"
                },
                "d0a6": {
                    "name": "d0a6",
                    "info": "",
                    "label": "Manual Movie Setting",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d0a7": {
                    "name": "d0a7",
                    "info": "",
                    "label": "Movie Quality",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d0a8": {
                    "name": "d0a8",
                    "info": "",
                    "label": "MovRecordMicrophoneLevelValue",
                    "readonly": false,
                    "type": "menu",
                    "value": "15",
                    "choices": [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20"
                    ]
                },
                "d0aa": {
                    "name": "d0aa",
                    "info": "",
                    "label": "MovWindNoiseReduction",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d0b5": {
                    "name": "d0b5",
                    "info": "",
                    "label": "ISOControlSensitivity",
                    "readonly": true,
                    "type": "text",
                    "value": "400"
                },
                "d0c0": {
                    "name": "d0c0",
                    "info": "",
                    "label": "Bracketing Enable",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d0c1": {
                    "name": "d0c1",
                    "info": "",
                    "label": "Exposure Bracketing Step",
                    "readonly": false,
                    "type": "menu",
                    "value": "3",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7"
                    ]
                },
                "d0c2": {
                    "name": "d0c2",
                    "info": "",
                    "label": "Exposure Bracketing Program",
                    "readonly": true,
                    "type": "menu",
                    "value": "2",
                    "choices": [
                        "2"
                    ]
                },
                "d0c3": {
                    "name": "d0c3",
                    "info": "",
                    "label": "Auto Exposure Bracket Count",
                    "readonly": true,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d0c4": {
                    "name": "d0c4",
                    "info": "",
                    "label": "White Balance Bracket Step",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2"
                    ]
                },
                "d0c5": {
                    "name": "d0c5",
                    "info": "",
                    "label": "White Balance Bracket Program",
                    "readonly": true,
                    "type": "menu",
                    "value": "2",
                    "choices": [
                        "2"
                    ]
                },
                "d0c6": {
                    "name": "d0c6",
                    "info": "",
                    "label": "ADLBracketingPattern",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0"
                    ]
                },
                "d0e0": {
                    "name": "d0e0",
                    "info": "",
                    "label": "Lens ID",
                    "readonly": true,
                    "type": "text",
                    "value": "125"
                },
                "d0e1": {
                    "name": "d0e1",
                    "info": "",
                    "label": "Lens Sort",
                    "readonly": true,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d0e2": {
                    "name": "d0e2",
                    "info": "",
                    "label": "Lens Type",
                    "readonly": true,
                    "type": "text",
                    "value": "59"
                },
                "d0e3": {
                    "name": "d0e3",
                    "info": "",
                    "label": "Min. Focal Length",
                    "readonly": true,
                    "type": "text",
                    "value": "1700"
                },
                "d0e4": {
                    "name": "d0e4",
                    "info": "",
                    "label": "Max. Focal Length",
                    "readonly": true,
                    "type": "text",
                    "value": "5500"
                },
                "d0e5": {
                    "name": "d0e5",
                    "info": "",
                    "label": "Max. Aperture at Min. Focal Length",
                    "readonly": true,
                    "type": "text",
                    "value": "280"
                },
                "d0e6": {
                    "name": "d0e6",
                    "info": "",
                    "label": "Max. Aperture at Max. Focal Length",
                    "readonly": true,
                    "type": "text",
                    "value": "280"
                },
                "d0f8": {
                    "name": "d0f8",
                    "info": "",
                    "label": "Auto Distortion Control",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d0f9": {
                    "name": "d0f9",
                    "info": "",
                    "label": "Scene Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "18",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18"
                    ]
                },
                "d100": {
                    "name": "d100",
                    "info": "",
                    "label": "Nikon Exposure Time",
                    "readonly": true,
                    "type": "menu",
                    "value": "65538",
                    "choices": [
                        "69536",
                        "68536",
                        "67536",
                        "67036",
                        "66536",
                        "66286",
                        "66036",
                        "65886",
                        "65786",
                        "65716",
                        "65661",
                        "65626",
                        "65596",
                        "65581",
                        "65566",
                        "65556",
                        "65551",
                        "65546",
                        "65544",
                        "65542",
                        "65540",
                        "65539",
                        "65538",
                        "655375",
                        "65537",
                        "983050",
                        "131073",
                        "196609",
                        "262145",
                        "393217",
                        "524289",
                        "655361",
                        "983041",
                        "1310721",
                        "1966081"
                    ]
                },
                "d101": {
                    "name": "d101",
                    "info": "",
                    "label": "AC Power",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d102": {
                    "name": "d102",
                    "info": "",
                    "label": "Warning Status",
                    "readonly": true,
                    "type": "text",
                    "value": "0"
                },
                "d104": {
                    "name": "d104",
                    "info": "",
                    "label": "AF Locked",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d105": {
                    "name": "d105",
                    "info": "",
                    "label": "AE Locked",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d108": {
                    "name": "d108",
                    "info": "",
                    "label": "Active AF Sensor",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "29",
                        "30",
                        "31",
                        "32",
                        "33",
                        "34",
                        "35",
                        "36",
                        "37",
                        "38",
                        "39"
                    ]
                },
                "d109": {
                    "name": "d109",
                    "info": "",
                    "label": "Flexible Program",
                    "readonly": false,
                    "type": "range",
                    "value": 0,
                    "min": -30,
                    "max": 30,
                    "step": 3
                },
                "d10b": {
                    "name": "d10b",
                    "info": "",
                    "label": "Recording Media",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2"
                    ]
                },
                "d10e": {
                    "name": "d10e",
                    "info": "",
                    "label": "Camera Orientation",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d120": {
                    "name": "d120",
                    "info": "",
                    "label": "External Flash Attached",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d121": {
                    "name": "d121",
                    "info": "",
                    "label": "External Flash Status",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d122": {
                    "name": "d122",
                    "info": "",
                    "label": "External Flash Sort",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d124": {
                    "name": "d124",
                    "info": "",
                    "label": "External Flash Compensation",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "-18",
                        "-17",
                        "-16",
                        "-15",
                        "-14",
                        "-13",
                        "-12",
                        "-11",
                        "-10",
                        "-9",
                        "-8",
                        "-7",
                        "-6",
                        "-5",
                        "-4",
                        "-3",
                        "-2",
                        "-1",
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18"
                    ]
                },
                "d125": {
                    "name": "d125",
                    "info": "",
                    "label": "External Flash Mode",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7"
                    ]
                },
                "d126": {
                    "name": "d126",
                    "info": "",
                    "label": "Flash Exposure Compensation",
                    "readonly": false,
                    "type": "range",
                    "value": 0,
                    "min": -18,
                    "max": 6,
                    "step": 3
                },
                "d130": {
                    "name": "d130",
                    "info": "",
                    "label": "HDR Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]
                },
                "d149": {
                    "name": "d149",
                    "info": "",
                    "label": "Raw Bit Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d14e": {
                    "name": "d14e",
                    "info": "",
                    "label": "Active D-Lighting",
                    "readonly": false,
                    "type": "menu",
                    "value": "5",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]
                },
                "d14f": {
                    "name": "d14f",
                    "info": "",
                    "label": "Fluorescent Type",
                    "readonly": false,
                    "type": "menu",
                    "value": "6",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6"
                    ]
                },
                "d161": {
                    "name": "d161",
                    "info": "",
                    "label": "Autofocus Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "3",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4"
                    ]
                },
                "d163": {
                    "name": "d163",
                    "info": "",
                    "label": "AF Assist Lamp",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d164": {
                    "name": "d164",
                    "info": "",
                    "label": "Auto ISO P/A/DVP Setting",
                    "readonly": false,
                    "type": "menu",
                    "value": "10",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24"
                    ]
                },
                "d167": {
                    "name": "d167",
                    "info": "",
                    "label": "Flash Mode",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d16a": {
                    "name": "d16a",
                    "info": "",
                    "label": "ISO Auto",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d183": {
                    "name": "d183",
                    "info": "",
                    "label": "ISO Auto High Limit",
                    "readonly": false,
                    "type": "menu",
                    "value": "3",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7"
                    ]
                },
                "d1a2": {
                    "name": "d1a2",
                    "info": "",
                    "label": "Live View Status",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d1a3": {
                    "name": "d1a3",
                    "info": "",
                    "label": "Live View Image Zoom Ratio",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]
                },
                "d1a4": {
                    "name": "d1a4",
                    "info": "",
                    "label": "Live View Prohibit Condition",
                    "readonly": true,
                    "type": "text",
                    "value": "0"
                },
                "d1ac": {
                    "name": "d1ac",
                    "info": "",
                    "label": "LiveViewMovieMode",
                    "readonly": false,
                    "type": "menu",
                    "value": "2",
                    "choices": [
                        "1",
                        "2"
                    ]
                },
                "d1b0": {
                    "name": "d1b0",
                    "info": "",
                    "label": "Exposure Display Status",
                    "readonly": true,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3"
                    ]
                },
                "d1b1": {
                    "name": "d1b1",
                    "info": "",
                    "label": "Exposure Indicate Status",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "-60",
                        "-59",
                        "-58",
                        "-57",
                        "-56",
                        "-55",
                        "-54",
                        "-53",
                        "-52",
                        "-51",
                        "-50",
                        "-49",
                        "-48",
                        "-47",
                        "-46",
                        "-45",
                        "-44",
                        "-43",
                        "-42",
                        "-41",
                        "-40",
                        "-39",
                        "-38",
                        "-37",
                        "-36",
                        "-35",
                        "-34",
                        "-33",
                        "-32",
                        "-31",
                        "-30",
                        "-29",
                        "-28",
                        "-27",
                        "-26",
                        "-25",
                        "-24",
                        "-23",
                        "-22",
                        "-21",
                        "-20",
                        "-19",
                        "-18",
                        "-17",
                        "-16",
                        "-15",
                        "-14",
                        "-13",
                        "-12",
                        "-11",
                        "-10",
                        "-9",
                        "-8",
                        "-7",
                        "-6",
                        "-5",
                        "-4",
                        "-3",
                        "-2",
                        "-1",
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "29",
                        "30",
                        "31",
                        "32",
                        "33",
                        "34",
                        "35",
                        "36",
                        "37",
                        "38",
                        "39",
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45",
                        "46",
                        "47",
                        "48",
                        "49",
                        "50",
                        "51",
                        "52",
                        "53",
                        "54",
                        "55",
                        "56",
                        "57",
                        "58",
                        "59",
                        "60"
                    ]
                },
                "d1b2": {
                    "name": "d1b2",
                    "info": "",
                    "label": "Info Display Error Status",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d1b3": {
                    "name": "d1b3",
                    "info": "",
                    "label": "Exposure Indicate Lightup",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d1b4": {
                    "name": "d1b4",
                    "info": "",
                    "label": "ContinousShootingCount",
                    "readonly": true,
                    "type": "menu",
                    "value": "5",
                    "choices": [
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15",
                        "16",
                        "17",
                        "18",
                        "19",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "29",
                        "30",
                        "31",
                        "32",
                        "33",
                        "34",
                        "35",
                        "36",
                        "37",
                        "38",
                        "39",
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45",
                        "46",
                        "47",
                        "48",
                        "49",
                        "50",
                        "51",
                        "52",
                        "53",
                        "54",
                        "55",
                        "56",
                        "57",
                        "58",
                        "59",
                        "60",
                        "61",
                        "62"
                    ]
                },
                "d1b5": {
                    "name": "d1b5",
                    "info": "",
                    "label": "PTP Property 0xd1b5",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "32784",
                        "32785",
                        "32786",
                        "32787",
                        "32800"
                    ]
                },
                "d1c0": {
                    "name": "d1c0",
                    "info": "",
                    "label": "Flash Open",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d1c1": {
                    "name": "d1c1",
                    "info": "",
                    "label": "Flash Charged",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d1f0": {
                    "name": "d1f0",
                    "info": "",
                    "label": "ApplicationMode",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "0",
                        "1"
                    ]
                },
                "d1f1": {
                    "name": "d1f1",
                    "info": "",
                    "label": "ExposureRemaining",
                    "readonly": true,
                    "type": "range",
                    "value": 3985,
                    "min": 0,
                    "max": 65535,
                    "step": 1
                },
                "d1f4": {
                    "name": "d1f4",
                    "info": "",
                    "label": "ISOAutoShutterCorrectionTime",
                    "readonly": false,
                    "type": "menu",
                    "value": "0",
                    "choices": [
                        "-2",
                        "-1",
                        "0",
                        "1",
                        "2"
                    ]
                },
                "d200": {
                    "name": "d200",
                    "info": "",
                    "label": "Active Pic Ctrl Item",
                    "readonly": false,
                    "type": "menu",
                    "value": "1",
                    "choices": [
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "201",
                        "202",
                        "203",
                        "204",
                        "205",
                        "206",
                        "207",
                        "208",
                        "209"
                    ]
                },
                "d201": {
                    "name": "d201",
                    "info": "",
                    "label": "Change Pic Ctrl Item",
                    "readonly": true,
                    "type": "menu",
                    "value": "0",
                    "choices": []
                }
            }
        }
    }
}