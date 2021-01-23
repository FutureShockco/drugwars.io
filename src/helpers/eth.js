var sigUtil = require('eth-sig-util')
var ethUtil = require('ethereumjs-util')

const handleSignMessage = (publicAddress, request) => {
    var msg = ethUtil.bufferToHex(new Buffer(request, 'utf8'))
    // var msg = '0x1' // hexEncode(text)
    console.log(msg)
    var from = web3.eth.accounts[0]
    if (!from) return connect()
    console.log('CLICKED, SENDING SIGN REQ')
    var params = [msg, from]
    var method = 'personal_sign'

    web3.currentProvider.sendAsync({
        method,
        params,
        from,
    }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) return console.error(result.error)
        console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))
        console.log(result)
        console.log('recovering...')
        const msgParams = { data: msg }
        msgParams.sig = result.result
        console.dir({ msgParams })
        const recovered = sigUtil.recoverPersonalSignature(msgParams)
        console.dir({ recovered })
        if (recovered === from) {
            console.log('Successfully verified signer as ' + from)
            window.alert('Successfully verified signer as ' + from)
        } else {
            console.dir(recovered)
            console.log('Failed to verify signer when comparing ' + recovered.result + ' to ' + from)
            console.log('Failed, comparing %s to %s', recovered, from)
        }
        /*
        method = 'personal_ecRecover'
        var params = [msg, result.result]
        web3.currentProvider.sendAsync({
          method,
          params,
          from,
        }, function (err, recovered) {
          console.dir({ err, recovered })
          if (err) return console.error(err)
          if (result.error) return console.error(result.error)
          if (result.result === from ) {
            console.log('Successfully verified signer as ' + from)
          } else {
            console.log('Failed to verify signer when comparing ' + result.result + ' to ' + from)
          }
        })
        */
    })

}


export default handleSignMessage;