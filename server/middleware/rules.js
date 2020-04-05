module.exports = rule => {
    
  
    return async (req, res, next) => {
      const rule = !req.body 
      assert(rule, 401, '请填写完整信息')
      
      await next()
    }
  }