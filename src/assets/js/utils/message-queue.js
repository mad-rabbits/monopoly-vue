const oQueue = {
    queue: []
    , errors: []
    , firstProcessing : true
    , processingEnabled : true
    , bDebugMode : false
    , toMark : null
    , toPeriod : 1 * 1000

    , processingCallBack : function (data) {
        oQueue.debugMessage('processingCallBack. Data: ' + data);
    }

    , afterProcessingCallBack : function (total) {
        if (total) {
            oQueue.debugMessage('afterProcessingCallBack. Total processed: ' + total);
        }
    }

    , returnErrorsCallBack : function () {
        if (oQueue.errors.length) {
            oQueue.debugMessage('returnErrorsCallBack', oQueue.errors);
        }
    }
};

oQueue.setDebugMode = function (val) {
    oQueue.bDebugMode = !!val;
};

oQueue.debugMessage = function (msg) {
    if (oQueue.bDebugMode) {
        console.log(msg);
    }
};

oQueue.processingCallBack = function (total) {
    oQueue.debugMessage('DefaultCallBack. Total processed: ' + total);
};

oQueue.add = function (data) {
    oQueue.queue.push(data);
};

oQueue.addBatch = function (data) {
    $.each(data, function (i, row) {
        oQueue.add(row);
    });
};

oQueue.setProcessingCallBack = function (cb) {
    oQueue.processingCallBack = cb;
};

oQueue.setAfterProcessingCallBack = function (cb) {
    oQueue.afterProcessingCallBack = cb;
};

oQueue.setReturnErrorsCallBack = function (cb) {
    oQueue.returnErrorsCallBack = cb;
};

/**
 * Set value in seconds
 * @param t
 */
oQueue.setProcessingPeriod = function (t) {
    oQueue.toPeriod = t * 1000;
};

oQueue.processing = function () {
    oQueue.firstProcessing = false;
    let total = 0;
    while (oQueue.getQueueLength()) {
        if (!oQueue.processingEnabled) {
            break;
        }
        total++;
        try {
            oQueue.processingCallBack(oQueue.queue.shift());
        } catch (e) {
            oQueue.errors.push(e);
        }
    }
    if (oQueue.processingEnabled) {
        try {
            oQueue.afterProcessingCallBack(total);
        } catch (e) {
            oQueue.errors.push(e);
        }
    }
    try {
        oQueue.returnErrorsCallBack(oQueue.errors);
    } catch (e) {
        oQueue.debugMessage(e);
    }
    oQueue.errors = [];
    if (oQueue.processingEnabled) {
        oQueue.startProcessing();
    }
};

oQueue.stopProcessing = function() {
    oQueue.processingEnabled = false;
    clearTimeout(oQueue.toMark);
    oQueue.debugMessage('processingQueue halted');
    oQueue.firstProcessing = false;
};

oQueue.startProcessing = function() {
    oQueue.processingEnabled = true;
    oQueue.toMark = setTimeout(oQueue.processing, oQueue.toPeriod);
    if (oQueue.firstProcessing) {
        oQueue.debugMessage('processingQueue started');
    }
};

oQueue.getQueueLength = function () {
    return oQueue.queue.length;
};

oQueue.clearQueue = function () {
    return oQueue.queue = [];
};

if ('undefined' !== typeof (module)) {
    module.exports = oQueue;
}

export default oQueue;