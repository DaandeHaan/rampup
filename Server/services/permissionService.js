const { Permission } = require('../models');
const PermissionDTO = require('../dtos/PermissionDTO.js');

class PermissionService {
    async getPermissions() {
        const permissions = await Permission.findAll();
        return permissions.map(permission => {
            return new PermissionDTO(permission);
        })
    }
}

module.exports = new PermissionService();
